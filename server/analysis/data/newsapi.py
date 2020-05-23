import sys, json
import requests
from flask.json import jsonify

from .language import extract_entities, format_entities, merge_entities

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
    entities = dict()
    for article in response.json()['articles']:
        article_entities = dict()
        if article['description'] is not None:
            article_entities = extract_entities(article['description'])
        else:
            article_entities = extract_entities(article['title'])
        entities = merge_entities(entities, article_entities)
        article['entities'] = format_entities(article_entities)
        articles.append(article)
    
    return jsonify({
        "articles": articles,
        "entities": format_entities(entities)
    })