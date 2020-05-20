import wikipedia
from flask.json import jsonify

from .language import extract_entities

def get_wiki(entity):
    page = wikipedia.page(entity)
    summary = wikipedia.summary(entity, sentences=4)
    return jsonify({
        "title": page.title,
        "url": page.url,
        "content": page.content,
        "summary": summary,
        "entities": extract_entities(summary)
    })