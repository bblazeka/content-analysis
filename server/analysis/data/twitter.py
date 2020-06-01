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

auth = OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
auth_api = API(auth, wait_on_rate_limit=True)

def get_tweets(query, count, lang):
    tweets = TweetsList()
    for status in Cursor(auth_api.search,q=f'{query}',count=count, tweet_mode='extended',
                           since="2020-01-01").items(100):
        tweets.append(status)
    return tweets.get_json()

def get_local_tweets(query, count, lang, lat, lng):
    tweets = TweetsList()
    for status in Cursor(auth_api.search,q=f'{query}',count=count, geocode=f'{lat},{lng},10km',
                           since="2020-01-01").items():
        tweets.append(status)         
    return tweets.get_json()


class TweetsList(list):

    def __init__(self):
        self.tweets = []
        self.entities = dict()

    def append(self, status):
        tweet_entities = extract_entities(status.full_text)
        self.tweets.append({
            "title": status.user.name,
            "entities": format_entities(tweet_entities),
            "description": status.user.screen_name,
            "url": f'https://twitter.com/{status.user.screen_name}',
            "text": status.full_text,
            "verified": status.user.verified,
            "retweeted": status.retweet_count,
            "favorite": status.favorite_count
        })
        self.entities = merge_entities(self.entities, tweet_entities)

    def get_json(self):
        return {
            "tweets": sorted(self.tweets, key=lambda k: k['favorite'], reverse=True),
            "entities": format_entities(self.entities)
        }