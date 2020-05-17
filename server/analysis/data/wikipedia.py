import wikipedia
from flask.json import jsonify

def get_wiki(entity):
    page = wikipedia.page(entity)
    summary = wikipedia.summary(entity, sentences=4)
    return jsonify({
        "title": page.title,
        "url": page.url,
        "content": page.content,
        "summary": summary
    })