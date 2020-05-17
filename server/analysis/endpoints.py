"""
Routes and views for the flask application.
"""

from analysis import app
from flask.json import jsonify

from analysis.data.wikipedia import get_wiki
from analysis.data.twitter import get_tweets
from analysis.data.newsapi import get_query_news, get_country_news

@app.route('/')
@app.route('/home')
def home():
    """Renders the home page."""
    news = get_country_news('us')
    return news

@app.route('/feed/<query>')
def feed(query):
    #tweets = get_tweets(query)
    print(news)
    return jsonify(news)

@app.route('/news/<query>')
def news(query):
    news = get_query_news(query)
    return news

@app.route('/wiki/<query>')
def wiki(query):
    wiki = get_wiki(query)
    return wiki