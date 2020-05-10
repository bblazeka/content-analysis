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

def get_tweets(query):
    tweets = []
    
    for status in Cursor(auth_api.search,q=f'#{query}',count=100,
                           since="2019-04-03").items():
        if status.truncated == False and status.lang == "en":
            extract_entities(status.text)
        tweets.append(status._json)
    return tweets