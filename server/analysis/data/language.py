import nltk
from nltk.tree import Tree
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag

def extract_entities(text):
    entity_dict = dict()
    previous_chunk = None

    for sent in nltk.sent_tokenize(text):
        for chunk in nltk.ne_chunk(nltk.pos_tag(nltk.word_tokenize(sent))):
            if type(chunk) == Tree:
                name = get_name_from_chunk(chunk, previous_chunk)
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
                elif chunk.label() == "GPE" or chunk.label() == "GSP":
                    entity_dict[name]["type"] = 'globe'
                    entity_dict[name]["viewType"] = 'place'
                elif chunk.label() == "ORGANIZATION" or chunk.label() == "FACILITY":
                    entity_dict[name]["type"] = 'building'
                previous_chunk = chunk
            else:
                previous_chunk = None
    # can be person, organization or gpe = Geopolitical entity
    return group_entities(entity_dict)

def merge_entities(entities_a, entities_b):
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

def get_name_from_chunk(chunk, previous_chunk):
    if previous_chunk is not None and chunk.label() == previous_chunk.label() \
        and len(chunk.leaves()) == 1 and len(previous_chunk.leaves()) == 1:
        return f'{previous_chunk.leaves()[0][0]} {chunk.leaves()[0][0]}'
    else:
        return ' '.join(c[0] for c in chunk.leaves())

def group_entities(entities):
    for k,v in entities.items():
        if len([key for key,val in entities.items() if k in key]) > 0:
            for key,_ in entities.items():
                if k in key and k != key:
                    entities[key]["count"]+=v["count"]
                    v["count"]=0
    output_dict = dict()
    for key,val in entities.items():
        if val["count"] > 0:
            output_dict[key] = val
    return output_dict

