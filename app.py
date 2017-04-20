
'''
This program is mainly to make champion selection suggestions for the player_name the user input
The average champion points, champion winrate and 5 champion lanes are derived from our 14 GB data source:
champion mastery, game and match; applied Hadoop to process the data and get static results for the
base of suggestions.

For the user input palyer_name, we use official API from Riot to get the player's ID and champion mastery
for champions he or she has played, and do the analysis combined with our static results from Hadoop.

Firstly we calculate the player's total champion points for every lane to determine which lane the player
is most inclined to play. For that lane, we get 10 highest winrate champion from our champion lists, compare
it with average champion mastery for each champion, we can get 3 suggested champions for the player.

Notice that, there is an assumption in our analysis, which is that if a champion has both high winrate and low
average champion mastery(points), it means that the player will spend less time to practice and be good
at that champion, which will increase the player's overall winrate in the end.
'''
from flask import render_template, request, Flask, json
import urllib2
import urlparse
import redis
import os
import psycopg2
import datetime
from collections import OrderedDict
app = Flask(__name__, template_folder='templates', static_folder='static')



# list of tuples(champID, mastery)
top_5_champs = []
top_5_champ_names = []

# applied Hadoop to get average win_rate and champ_points for every champ ID
win_rates = {}
aram_win_rates = {}
champ_points = {}
champ_name_to_id = {}
champion_names = {}
player_champ_points = {}
top_win_rates = {}
mid_win_rates = {}
bot_win_rates = {}
jug_win_rates = {}
sup_win_rates = {}
aram_top_win_rates = {}
aram_mid_win_rates = {}
aram_bot_win_rates = {}
aram_jug_win_rates = {}
aram_sup_win_rates = {}

# top 10 for that lane
top_10_win_rate_champs = {}
aram_top_10_win_rate_champs = {}
champ_select_suggestions = {}
aram_champ_select_suggestions = {}


TOP =[14, 17, 23, 27, 36, 39, 41, 48, 54, 57, 58, 62, 68, 75, 78, 80, 82, 83, 85, 86, 92, 98, 114, 122, 126, 133, 150, 240, 266, 420]
JUNGLE =[2, 5, 11, 19, 20, 24, 28, 32, 33, 35, 56, 59, 60, 64, 72, 76, 77, 79, 102, 104, 106, 107, 113, 120, 121, 154, 203, 254, 421, 427]
BOTTOM =[15, 18, 21, 22, 29, 51, 67, 81, 119, 202, 222, 236, 429]
MIDDLE = [1, 3, 4, 6, 7, 8, 9, 10, 13, 26, 30, 31, 34, 38, 42, 45, 50, 55, 61, 63, 69, 74, 84, 90, 91, 96, 99, 101, 103, 105, 110, 112, 115, 127, 131, 134, 136, 157, 161, 163, 238, 245, 268]
SUPPORT = [12, 16, 25, 37, 40, 43, 44, 53, 89, 111, 117, 143, 201, 223, 267, 412, 432]



redis_url = os.getenv('REDISTOGO_URL', 'redis://localhost:6379')
r = redis.from_url(redis_url)

r.set("visit:times", 0)
# this kind of data only loads once
def load_data():
    with open('champions_title.json', 'r') as title_file:
        title_data = json.load(title_file)
        for name in title_data.keys():
            champ_name_to_id[name] = title_data[name]['id']
    with open('average_champion_mastery.txt', 'r') as file:
        while 1:
            line = file.readline()
            if not line:
                break
            champ_points[(int)(line.split("\t")[0])] = (int)(line.split("\t")[1])
    with open('rank_winrates.txt', 'r') as rank_winrates:
        while 1:
            line = rank_winrates.readline()
            if not line:
                break
            win_rates[champ_name_to_id.get(line.split()[0])] = (float)(line.split()[1]) / 100.0
    with open('aram_winrates.txt', 'r') as aram_winrates:
        while 1:
            line = aram_winrates.readline()
            if not line:
                break
            aram_win_rates[champ_name_to_id[(line.split()[0])]] = (float)(line.split()[1]) / 100.0
    # get win rate for every lane, both game modes
    for champ in win_rates.keys():
        if champ in TOP:
            top_win_rates[champ] = win_rates[champ]
            aram_top_win_rates[champ] = aram_win_rates[champ]
        elif champ in JUNGLE:
            jug_win_rates[champ] = win_rates[champ]
            aram_jug_win_rates[champ] = aram_win_rates[champ]
        elif champ in MIDDLE:
            mid_win_rates[champ] = win_rates[champ]
            aram_mid_win_rates[champ] = aram_win_rates[champ]
        elif champ in BOTTOM:
            bot_win_rates[champ] = win_rates[champ]
            aram_bot_win_rates[champ] = aram_win_rates[champ]
        elif champ in SUPPORT:
            sup_win_rates[champ] = win_rates[champ]
            aram_sup_win_rates[champ] = aram_win_rates[champ]

def get_player_name(playerID):
    url = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/{}/name?api_key=RGAPI-c1d4a63a-8a02-4e0b-891f-bd8c3c9f6431".format((str)(playerID))
    try:
        data = urllib2.urlopen(url, timeout=12)
        statusCode = data.getcode()
        if statusCode == 200:
            page = data.read()
            content = json.loads(page)
            name = content[str(playerID)]
            return name
    except:
        return 'failed to get the player name'

def get_player_id(playerName):
    url = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/{}?api_key=RGAPI-c1d4a63a-8a02-4e0b-891f-bd8c3c9f6431".format(playerName)
    try:
        data = urllib2.urlopen(url, timeout=12)
        statusCode = data.getcode()
        if statusCode == 200:
            page = data.read()
            content = json.loads(page)
            id = content[playerName.lower()]["id"]
            return id
    except:
        return 'Wrong name!'


def get_top_5_champs(playerID):
    url = "https://na.api.pvp.net/championmastery/location/NA1/player/{}/champions?api_key=RGAPI-bed8d7c5-334d-40b5-8807-5fa186553d2c".format(playerID)
    try:
        data = urllib2.urlopen(url, timeout=12)
        statusCode = data.getcode()
        if statusCode == 200:
            page = data.read()
            content = json.loads(page)
            for dic in content:
                player_champ_points[dic['championId']] = dic['championPoints']
    except:
        return 'error'
    sorted_by_value = OrderedDict(reversed(sorted(player_champ_points.items(), key=lambda x: x[1])))
    index = 0
    for x in sorted_by_value.items():
        if index < 5:
            top_5_champs.append(x)
        index += 1
    # make a list here, 0-5 means mid, top, bot, jug, sup, preference
    result = [0,0,0,0,0,"whatever"]
    for x in player_champ_points.keys():
        if x in MIDDLE:
            result[0] += player_champ_points[x]
        elif x in TOP:
            result[1] += player_champ_points[x]
        elif x in BOTTOM:
            result[2] += player_champ_points[x]
        elif x in JUNGLE:
            result[3] += player_champ_points[x]
        elif x in SUPPORT:
            result[4] += player_champ_points[x]
    maxPoint = 0
    for x in range(5):
        maxPoint = max(maxPoint, result[x])
    preference = -1
    for x in range(5):
        if maxPoint == result[x]:
            preference = x
            break
    if preference == 0:
        result[5] = "middle lane"
    elif preference == 1:
        result[5] = "top lane"
    elif preference == 2:
        result[5] = "bottom lane"
    elif preference == 3:
        result[5] = "jungle lane"
    elif preference == 4:
        result[5] = "support"
    return result



# most familiar 5 champs
def get_champion_names():
    lis = []
    name = open('champions.json', 'r')
    title = open('champions_title.json', 'r')
    title_data = json.load(title)
    name_data = json.load(name)
    # fill the champ_names list and player_champ_points
    for champ in name_data.keys():
        champion_names[(int)(champ)] = name_data.get(champ)
        if (int)(champ) in player_champ_points:
            continue
        else:
            player_champ_points[(int)(champ)] = 0
    for champ in top_5_champs:
        champID = champ[0]
        champName = name_data.get(str(champID))
        lis.append(champName)
        champ_title = title_data.get(champName).get('title')
        lis.append(champ_title)
        lis.append(player_champ_points[(int)(champID)])
        top_5_champ_names.append(name_data.get(str(champ[0])))
    string = 'You are most familiar with these five champions: \n'
    for champ_name in top_5_champ_names:
        string += champ_name + ': ' + title_data.get(champ_name).get('title') + '\n'
    name.close()
    title.close()
    print string +'\n'
    return lis



def make_suggestions(lane):
    lis = []
    aram_lis = []
    sorted_by_value = {}
    sorted_by_value_a = {}
    if lane == 'middle lane':
        sorted_by_value = OrderedDict(reversed(sorted(mid_win_rates.items(), key=lambda x: x[1])))
        sorted_by_value_a = OrderedDict(reversed(sorted(aram_mid_win_rates.items(), key=lambda x: x[1])))
    elif lane == 'bottom lane':
        sorted_by_value = OrderedDict(reversed(sorted(bot_win_rates.items(), key=lambda x: x[1])))
        sorted_by_value_a = OrderedDict(reversed(sorted(aram_bot_win_rates.items(), key=lambda x: x[1])))
    elif lane == 'top lane':
        sorted_by_value = OrderedDict(reversed(sorted(top_win_rates.items(), key=lambda x: x[1])))
        sorted_by_value_a = OrderedDict(reversed(sorted(aram_top_win_rates.items(), key=lambda x: x[1])))
    elif lane == 'jungle lane':
        sorted_by_value = OrderedDict(reversed(sorted(jug_win_rates.items(), key=lambda x: x[1])))
        sorted_by_value_a = OrderedDict(reversed(sorted(aram_jug_win_rates.items(), key=lambda x: x[1])))
    elif lane == 'support':
        sorted_by_value = OrderedDict(reversed(sorted(sup_win_rates.items(), key=lambda x: x[1])))
        sorted_by_value_a = OrderedDict(reversed(sorted(aram_sup_win_rates.items(), key=lambda x: x[1])))
    index = 0
    for x in sorted_by_value.keys():
        if index < 10:
            top_10_win_rate_champs[x] = sorted_by_value[x]
            index += 1
    index = 0
    for x in sorted_by_value_a.keys():
        if index < 10:
            aram_top_10_win_rate_champs[x] = sorted_by_value_a[x]
            index += 1
    # we have top 10 win rate champ for that lane, get three with lowest champion mastery points
    # hadoop to get the average champion points for every champ
    champ_points_of_10 = {}
    for x in top_10_win_rate_champs.keys():
        champ_points_of_10[x] = champ_points[x]
    ordered_champ_points_of_10 = OrderedDict(sorted(champ_points_of_10.items(), key=lambda x: x[1]))
    index = 0
    top_5_champ_id = []
    for x in top_5_champs:
        top_5_champ_id.append(x[0])
    for key,value in ordered_champ_points_of_10.items():
        if index < 3:
            # pass the champions the player already good at
            if key in top_5_champ_id:
                continue
            champ_select_suggestions[key] = value
            index += 1

    champ_points_of_10 = {}
    for x in aram_top_10_win_rate_champs.keys():
        champ_points_of_10[x] = champ_points[x]
    aram_ordered_champ_points_of_10 = OrderedDict(sorted(champ_points_of_10.items(), key=lambda x: x[1]))
    index = 0
    for key,value in aram_ordered_champ_points_of_10.items():
        if index < 3:
            if key in top_5_champ_id:
                continue
            if key in champ_select_suggestions.keys():
                continue
            aram_champ_select_suggestions[key] = value
            index += 1

    # now we have three recommended champs
    string = 'The recommended champions for you are: \n'
    print
    for champ in champ_select_suggestions.keys():
        lis.append(str(champion_names[champ]))
        lis.append((str)((round)(win_rates[champ] * 100, 1)) + "%")
        lis.append(str(player_champ_points[champ]))
        string += (str)(champion_names[champ]) + ", average winrate: " +(str)((round)(win_rates[champ] * 100, 1)) + "%, "\
        "your current champion mastery is: " + str(player_champ_points[champ]) + '\n'
    for champ in aram_champ_select_suggestions.keys():
        aram_lis.append(str(champion_names[champ]))
        aram_lis.append((str)((round)(aram_win_rates[champ] * 100, 1)) + "%")
        aram_lis.append(str(player_champ_points[champ]))
    return (lis, aram_lis)

# create database before app first created
@app.before_first_request
def create_tables():
    # conn = psycopg2.connect(dbname='postgres', user='postgres', host='localhost', password='???')
    urlparse.uses_netloc.append("postgres")
    url = urlparse.urlparse(os.environ["DATABASE_URL"])
    conn = psycopg2.connect(
        database=url.path[1:],
        user=url.username,
        password=url.password,
        host=url.hostname,
        port=url.port
    )
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS lastdates (lastdate timestamp)")
    conn.commit()
    cursor.close()
    conn.close()

@app.route('/')
def index():
    load_data()
    return render_template('index.html')

@app.route('/result', methods = ['POST'])
def show_result():
    # increse the search times in history
    r.incr("visit:times")
    times = r.get("visit:times")
    # conn = psycopg2.connect(dbname='postgres', user='postgres', host='localhost', password='???@')
    urlparse.uses_netloc.append("postgres")
    url = urlparse.urlparse(os.environ["DATABASE_URL"])
    conn = psycopg2.connect(
        database=url.path[1:],
        user=url.username,
        password=url.password,
        host=url.hostname,
        port=url.port
    )
    cursor = conn.cursor()
    # in postgreSQL, cursor.execute() wont return anything! not like sqlite3!
    cursor.execute("SELECT * FROM lastdates ORDER BY lastdate DESC LIMIT 1")
    # fetchone() return a tuple, if no results, if last_search_time_result will be false
    last_search_time_result = cursor.fetchone()
    last_search_time = last_search_time_result[0] if last_search_time_result else "This is the first search"
    now = datetime.datetime.today()
    cursor.execute("INSERT INTO lastdates VALUES (%s);", (now, ))
    cursor.execute("SELECT COUNT(*) from lastdates")
    total_search_times = cursor.fetchone()[0]
    conn.commit()
    conn.close()
    if request.form.get('Search',None) == 'Search':
        # make these global, so we can change the value everywhere
        try:
            global top_5_champ_names
            global champ_select_suggestions
            global top_5_champs
            global top_10_win_rate_champs
            global aram_champ_select_suggestions
            global aram_top_10_win_rate_champs
            global player_champ_points
            player_champ_points = {}
            top_10_win_rate_champs = {}
            aram_top_10_win_rate_champs = {}
            top_5_champs = []
            top_5_champ_names = []
            champ_select_suggestions = {}
            aram_champ_select_suggestions = {}
            load_data()
            playerName = request.form.get('playerName')
            player_name = ''
            for x in playerName.split():
                player_name += x
            playerName = player_name

            playerID = get_player_id(playerName)
            pointsList = get_top_5_champs(playerID)
            lane = pointsList[5]

            top_5_list = get_champion_names()

            lis, aram_lis = make_suggestions(lane)
            champs = champ_select_suggestions.keys()
            aram_champs = aram_champ_select_suggestions.keys()
            player_name_list = playerName.split()
            name_with_space = ''
            for x in player_name_list:
                name_with_space += (x + '+')
            name_with_space = name_with_space[:-1]
            playerName = get_player_name(playerID)

            return render_template('result.html',
                last_search_time=last_search_time,
                search_times = times,
                player_name=playerName,
                name_with_space=name_with_space,
                champs=champs,aram_champs=aram_champs,
                lane=lane,lis=lis, pointsList=pointsList,
                aram_lis=aram_lis,top_5_list=top_5_list,
                total_search_times=total_search_times)
        except:
            return "wrong name, please input the correct name!"

# run from localhost
if __name__ == '__main__':
    app.run(debug=True,port=5080)
