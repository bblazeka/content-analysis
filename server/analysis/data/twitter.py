from tweepy import OAuthHandler
from tweepy import API
from tweepy import Cursor
from datetime import datetime, date, time, timedelta

from collections import Counter
import sys, json

from .language import extract_entities

with open('keys/twitter.json') as json_file:
    data = json.load(json_file)
    consumer_key=data["consumer_key"]
    consumer_secret=data["consumer_secret"]
    access_token=data["access_token"]
    access_token_secret=data["access_token_secret"]

account_list = []

auth = OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
auth_api = API(auth, wait_on_rate_limit=True)

def detect_hashtags(status):
    hashtags = []
    if hasattr(status, "entities"):
        entities = status.entities
        if "hashtags" in entities:
            for ent in entities["hashtags"]:
                if ent is not None:
                    if "text" in ent:
                        hashtag = ent["text"]
                        if hashtag is not None:
                            hashtags.append(hashtag)
    return hashtags

def get_tweets(query, count, lang):
    tweets = []
    
    for status in Cursor(auth_api.search,q=f'#{query}',count=count,
                           since="2020-01-01").items():
        if status.truncated == False and status.lang == lang:
            extract_entities(status.text)
            tweets.append(status._json)
    return tweets

def get_local_tweets(query, count, lang, lat, lng):
    tweets = []
    for status in Cursor(auth_api.search,q=f'#{query}',count=count, geocode=f'{lat},{lng},10km',
                           since="2020-01-01").items():
        if status.truncated == False and status.lang == lang:
            print(status._json)
            tweets.append({
                "title": status.user.name,
                "entities": extract_entities(status.text),
                "description": status.user.screen_name,
                "url": f'https://twitter.com/{status.user.screen_name}',
                "text": status.text
            })
    return tweets