import wikipedia
from flask.json import jsonify

from .language import extract_entities, format_entities

def get_wiki(entity):
    try:
        page = wikipedia.page(entity)
    except:
        search = wikipedia.search(entity)
        page = wikipedia.page(search[0], auto_suggest=False, redirect=False)
    try:
        summary = wikipedia.summary(entity)
    except:
        search = wikipedia.search(entity)
        summary = wikipedia.summary(search[0], auto_suggest=False, redirect=False)
    return jsonify({
        "title": page.title,
        "url": page.url,
        "content": page.content,
        "summary": summary,
        "entities": format_entities(extract_entities(summary))
    })