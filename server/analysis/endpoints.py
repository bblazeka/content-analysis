"""
Routes and views for the flask application.
"""

from analysis import app
from flask import request
from flask.json import jsonify

from analysis.data.wikipedia import get_wiki
from analysis.data.twitter import get_tweets, get_local_tweets
from analysis.data.newsapi import get_query_news, get_country_news
from analysis.data.map import geocode

@app.route('/')
@app.route('/home')
def home():
    """Renders the home page."""
    news = get_country_news('us')
    return news

@app.route('/tweets/<query>')
def tweets(query):
    tweets = get_tweets(query, 10, "en")
    return jsonify(tweets)

@app.route('/tweets/local/<query>')
def local_tweets(query):
    lat = request.args.get('lat')
    lng = request.args.get('lng')
    tweets = get_local_tweets(query, 10, "en", lat, lng)
    return jsonify(tweets)

@app.route('/news/<query>')
def news(query):
    news = get_query_news(query)
    return news

@app.route('/wiki/<query>')
def wiki(query):
    wiki = get_wiki(query)
    return wiki

@app.route('/map/geocode/<place>')
def geocoding(place):
    return geocode(place)