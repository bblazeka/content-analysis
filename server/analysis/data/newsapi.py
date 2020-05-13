import sys, json
import requests
from flask.json import jsonify

from .language import extract_entities

with open('keys/newsapi.json') as json_file:
    data = json.load(json_file)
    newsApiKey=data["apiKey"]

def get_query_news(query):
    date = '2020-05-09'
    url = ('http://newsapi.org/v2/everything?'
            f'q={query}&'
            f'from={date}&'
            'sortBy=popularity&'
            f'apiKey={newsApiKey}')
    response = requests.get(url)

    return format_news(response)

def get_country_news(country):
    url = ('http://newsapi.org/v2/top-headlines?'
           f'country={country}&'
            f'apiKey={newsApiKey}')
    response = requests.get(url)
    
    return format_news(response)

def format_news(response):
    articles = []
    for article in response.json()['articles']:
        if article['description'] is not None:
            article['entities'] = extract_entities(article['description'])
        else:
            article['entities'] = extract_entities(article['title'])
        articles.append(article)
    return jsonify(articles)