import nltk
from nltk.tree import Tree
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag

def extract_entities(text):
    entities = []
    for sent in nltk.sent_tokenize(text):
        for chunk in nltk.ne_chunk(nltk.pos_tag(nltk.word_tokenize(sent))):
            if type(chunk) == Tree:
                if chunk.label() == "PERSON":
                    entities.append({
                        "type": 'user', 
                        "text": ' '.join(c[0] for c in chunk.leaves())
                    })
                elif chunk.label() == "GPE":
                    entities.append({
                        "type": 'globe', 
                        "text": ' '.join(c[0] for c in chunk.leaves())
                    })
                elif chunk.label() == "ORGANIZATION":
                    entities.append({
                        "type": 'building', 
                        "text": ' '.join(c[0] for c in chunk.leaves())
                    })                
    # can be person, organization or gpe = Geopolitical entity
    return entities