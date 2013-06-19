'''
Created on 11/06/2013

@author: michogarcia
'''
from flask import Blueprint, request, g, jsonify, json, redirect, url_for, Response
from functools import wraps
from models.user import User
from models.marker import Marker
from database import engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql import and_

api = Blueprint('api', __name__, url_prefix='/geoposter')

def check_login(username, password):
    user = g.db.query(User).filter(and_(User.name==username, User.password==password)).first()
    if (user != None):
        return True
    else:
        return False

def authenticate():
    return Response(
    'Could not verify your access level for that URL.\n'
    'You have to login with proper credentials', 401)

def requires_login(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth or not check_login(auth.username, auth.password):
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

@api.route('/login', methods=['GET', 'POST'])
@requires_login
def login():
    return 'epa'
    
    
@api.route('/')
def home():
    return redirect(url_for('static', filename='index.html'))

@api.route('/marker', methods=['GET'])
def getMarkers():
    
    sql = "SELECT marker.fid AS marker_fid, marker.id AS marker_id, marker.title AS marker_title\
            , marker.description AS marker_description, ST_AsGeoJSON(marker.geom)\
             AS marker_geom, marker.user_id AS marker_user_id FROM marker"  
    markers = g.db.query(Marker).from_statement(sql).all()
    markersJSON = list()
    for marker in markers:
        markersJSON.append(marker.AsGeoJSON)

    return jsonify(type ='FeatureCollection', features = markersJSON)

@api.route('/marker', methods=['POST'])
def insertMarker():
    
    markerAsJSON = json.loads(request.data)
    marker = Marker(markerAsJSON)
    #HARDCODE FOREVER!!
    marker.user_id = 1
    g.db.add(marker)
    g.db.commit()
    
    markerinserted = g.db.query(Marker).filter_by(id=marker.id).first()
    
    if (markerinserted == None):
        return jsonify(success=False, marker='null')
    else:
        return jsonify(success=True, marker_id=marker.id)

@api.route('/marker/<marker_id>', methods=['GET'])
def getMarker(marker_id):
    
    sql = "SELECT marker.fid AS marker_fid, marker.id AS marker_id, marker.title AS marker_title\
            , marker.description AS marker_description, ST_AsGeoJSON(marker.geom)\
             AS marker_geom, marker.user_id AS marker_user_id FROM marker where marker.id = '" + marker_id + "'"
    marker = g.db.query(Marker).from_statement(sql).first()
    #marker = g.db.query(Marker).filter_by(id=marker_id).first()
    
    if (marker == None):
        return jsonify(success = False)
    else:
        return jsonify(marker.AsGeoJSON)
    
@api.route('/marker/<marker_id>', methods=['PUT'])
def updateMarker(marker_id):
    
    marker = Marker(json.loads(request.data))
    g.db.query(Marker).filter_by(id=marker_id).update({'title' : marker.title, 'description' : marker.description, 'geom' : marker.geom})
    g.db.commit()
    
    return jsonify(success = True)
    
@api.route('/marker/<marker_id>', methods=['DELETE'])
def deleteMarker(marker_id):
    
    marker = g.db.query(Marker).filter_by(id=marker_id).first()
    g.db.delete(marker);
    g.db.commit()
    
    return jsonify(success = True)
    

