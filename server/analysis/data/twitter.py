from tweepy import OAuthHandler
from tweepy import API
from tweepy import Cursor
from datetime import datetime, date, time, timedelta

from collections import Counter
import sys, json

from .language import extract_entities, format_entities, merge_entities

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
    entities = dict()
    
    for status in Cursor(auth_api.search,q=f'#{query}',count=count,
                           since="2020-01-01").items():
        if status.truncated == False and status.lang == lang:
            tweet_entities = extract_entities(status.text)
            tweets.append({
                "title": status.user.name,
                "entities": format_entities(tweet_entities),
                "description": status.user.screen_name,
                "url": f'https://twitter.com/{status.user.screen_name}',
                "text": status.text
            })
            entities = merge_entities(entities, tweet_entities)
    return {
        "tweets": tweets,
        "entities": format_entities(entities)
    }

def get_local_tweets(query, count, lang, lat, lng):
    tweets = []
    entities = dict()
    for status in Cursor(auth_api.search,q=f'#{query}',count=count, geocode=f'{lat},{lng},10km',
                           since="2020-01-01").items():
        if status.truncated == False and status.lang == lang:
            tweet_entities = extract_entities(status.text)
            tweets.append({
                "title": status.user.name,
                "entities": format_entities(tweet_entities),
                "description": status.user.screen_name,
                "url": f'https://twitter.com/{status.user.screen_name}',
                "text": status.text
            })
            entities = merge_entities(entities, tweet_entities)
    return {
        "tweets": tweets,
        "entities": format_entities(entities)
    }