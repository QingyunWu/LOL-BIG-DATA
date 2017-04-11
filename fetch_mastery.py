import urllib2
import json
import pprint
from pymongo import MongoClient
import time
import thread
db = MongoClient().lol
posts = db.mastery
f = open('player_ID_10w.txt', 'r')
fcollected = open('colletedMastery.txt', 'w')
fmissed = open('missedMastery.txt', 'w')

keys = []
keys.append("RGAPI-bed8d7c5-334d-40b5-8807-5fa186553d2c")
keys.append("RGAPI-499bb4b2-3fce-4824-9964-768e1eb32983")
keys.append("RGAPI-947ba119-a421-421d-9f9c-3699d5bb938e")
keys.append("RGAPI-c1d4a63a-8a02-4e0b-891f-bd8c3c9f6431")
keys.append("RGAPI-55787ebf-c932-4185-8a30-da566a0d0ce6")
added = 0
bad = 0
missed = 0
# url = "https://na.api.pvp.net/championmastery/location/NA1/player/{}/champions?api_key={}".format(20203321, 'RGAPI-55787ebf-c932-4185-8a30-da566a0d0ce6')
# data = urllib2.urlopen(url, timeout=12)
# statusCode = data.getcode()
# if statusCode == 200:
#     page = data.read()
#     content = json.loads(page)
#     pprint.pprint(content)
#     for every in content:
#         posts.insert_one(every)

def fetchData(line, index):
    global added, bad, missed
    url = "https://na.api.pvp.net/championmastery/location/NA1/player/{}/champions?api_key={}".format(line[:-1], keys[index])
    try:
        data = urllib2.urlopen(url, timeout=12)
        statusCode = data.getcode()
        if statusCode == 200:
            page = data.read()
            content = json.loads(page)
            for every in content:
                posts.insert_one(every)
            added += 1
            print "added: " + line[: -1] + "  total: " + str(added)
            fcollected.write(line)
        else:
            bad += 1
            print "                                     " \
                  "                                     " \
                  "bad: " + line[: -1] + "  total: " + str(bad)
            fmissed.write(line)

    except:
        missed += 1
        print "                                     " \
              "missed " + line[: -1] + "  total: " + str(missed)
        fmissed.write(line)

try:
    while 1:
        for index in range(5):
            time.sleep(0.3)
            line = f.readline()
            if not line:
                break
            thread.start_new_thread(fetchData, (line, index))
finally:
    f.close()
    fcollected.close()
    fmissed.close()