import sys, json
import requests

from .language import process_text, extract_entities

with open('keys/newsapi.json') as json_file:
    data = json.load(json_file)
    newsApiKey=data["apiKey"]

def get_query_news(query):
    date = '2020-05-09'
    url = ('http://newsapi.org/v2/top-headlines?'
            f'q={query}&'
            f'from={date}&'
            'sortBy=popularity&'
            f'apiKey={newsApiKey}')
    response = requests.get(url)
    for article in response.json()['articles']:
        if article['description'] is not None:
            extract_entities(article['description'])
    return response.json()

def get_country_news(country):
    url = ('http://newsapi.org/v2/top-headlines?'
           f'country={country}&'
            f'apiKey={newsApiKey}')
    response = requests.get(url)
    
    for article in response.json()['articles']:
        if article['description'] is not None:
            extract_entities(article['description'])
    return response.json()

