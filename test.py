from flask import render_template, request, Flask, json
import urllib2
import urlparse
import redis
import os
import psycopg2
import datetime
from collections import OrderedDict
def get_player_id(playerName):
    url = "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/{}?api_key=RGAPI-811aab72-9378-4da9-a2cc-620d874db8f7".format(playerName)

    data = urllib2.urlopen(url, timeout=12)
    statusCode = data.getcode()
    if statusCode == 200:
        page = data.read()
        content = json.loads(page)
        id = content["id"]
        return id
    

def get_top_5_champs(playerID):
    url = "https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/{}?api_key=RGAPI-811aab72-9378-4da9-a2cc-620d874db8f7".format(playerID)
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

id = get_player_id('StupidBady')
print id
li = get_top_5_champs(id)
print li