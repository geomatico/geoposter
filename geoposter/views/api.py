'''
Created on 11/06/2013

@author: michogarcia
'''
from functools import wraps
from flask import Blueprint, request, Response, g, jsonify
from models.user import User
from models.marker import Marker
from database import engine
from sqlalchemy.orm import sessionmaker

api = Blueprint('api', __name__, url_prefix='/api')

def check_auth(username, password):
    
    authuser = g.db.query(User).filter(User.name == username).first()
    
    if (authuser is not None):
        if (authuser.password == password):
            return True
        else:
            return False
    else:
        return False

def authenticate():
    """Sends a 401 response that enables basic auth"""
    return Response(
    'Could not verify your access level for that URL.\n'
    'You have to login with proper credentials', 401,
    {'WWW-Authenticate': 'Basic realm="Login Required"'})

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth or not check_auth(auth.username, auth.password):
            return authenticate()
        return f(*args, **kwargs)
    return decorated

@api.before_request
def before_request():
    session = sessionmaker(bind=engine)
    g.db = session()

@api.teardown_request
def teardown_request(exception):
    db = getattr(g, 'db', None)
    if db is not None:
        db.close()
        
@api.route('/')
@requires_auth
def index():
    return 'Welcome to GeoPoster!'

@api.route('/marker', methods=['GET'])
#@requires_auth
def getmarkers():
    
    sql = "SELECT marker.fid AS marker_fid, marker.id AS marker_id, marker.title AS marker_title\
            , marker.description AS marker_description, ST_AsGeoJSON(marker.geom)\
             AS marker_geom, marker.user_id AS marker_user_id FROM marker"  
    markers = g.db.query(Marker).from_statement(sql).all()

    return jsonify(type ='FeatureCollection', features = [marker.AsJSON for marker in markers])
    