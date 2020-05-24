import sys, json

def get_key(folder):
    with open(folder) as json_file:
        data = json.load(json_file)
        return data["key"]
