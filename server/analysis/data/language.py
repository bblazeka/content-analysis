import nltk
from nltk.tree import Tree
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag

def extract_entities(text):
    entity_dict = dict()
    for sent in nltk.sent_tokenize(text):
        for chunk in nltk.ne_chunk(nltk.pos_tag(nltk.word_tokenize(sent))):
            print(chunk)
            if type(chunk) == Tree:
                name = ' '.join(c[0] for c in chunk.leaves())
                if name in entity_dict:
                    entity_dict[name]["count"]+=1
                else:
                    entity_dict[name] = {
                        "type": 'unknown',
                        "viewType": 'topic',
                        "count": 1
                    }
                if chunk.label() == "PERSON":
                    entity_dict[name]["type"] = 'user'
                elif chunk.label() == "GPE":
                    entity_dict[name]["type"] = 'globe'
                    entity_dict[name]["viewType"] = 'place'
                elif chunk.label() == "ORGANIZATION" or chunk.label() == "FACILITY":
                    entity_dict[name]["type"] = 'building'     
    # can be person, organization or gpe = Geopolitical entity
    return entity_dict

def merge_entities(entities_a, entities_b):
    print(entities_a)
    print(entities_b)
    merged_entities = entities_a.copy()
    merged_entities.update(entities_b)
    return merged_entities

def format_entities(entity_dict):
    entities = []
    for k, v in entity_dict.items():
        entities.append({
            "text": k,
            "type": v["type"],
            "viewType": v["viewType"],
            "count": v["count"]
        })
    return sorted(entities, key=lambda k: k['count'], reverse=True)