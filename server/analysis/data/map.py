from mapbox import Geocoder
from flask.json import jsonify

from .util import get_key

geocoder = Geocoder(access_token = get_key('keys/mapapi.json'))

def geocode(term):
    response = geocoder.forward(term)
    feature = response.json()["features"][0]
    print(feature)
    is_place = feature["place_type"][0] == 'place'
    return jsonify({
        "lng": feature["center"][0],
        "lat": feature["center"][1],
        "bbox": feature["bbox"],
        "text": feature["text"],
        "zoom": 9 if is_place else 5,
        "country": {
            "text": feature["context"][1]["text"],
            "code": feature["context"][1]["short_code"]
        } if is_place else {
            "text": feature["text"],
            "code": feature["properties"]["short_code"]
        }
    })