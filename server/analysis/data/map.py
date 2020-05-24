from mapbox import Geocoder
from flask.json import jsonify

from .util import get_key

geocoder = Geocoder(access_token = get_key('keys/mapapi.json'))

def geocode(term):
    response = geocoder.forward(term)
    feature = response.json()["features"][0]
    return jsonify({
        "lng": feature["center"][0],
        "lat": feature["center"][1],
        "text": feature["text"],
        #"country": {
        #    "text": feature["context"][1]["text"],
        #    "code": feature["context"][1]["short_code"]
        #}
    })