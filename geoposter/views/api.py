'''
Created on 11/06/2013

@author: michogarcia
'''
from functools import wraps
from flask import Blueprint, request, Response, g
from models.user import User
from database import db_session

api = Blueprint('api', __name__, url_prefix='/api')

def check_auth(username, password):
    
    authuser = db_session.query(User).filter(User.name == username).first()
    
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
    
@api.route('/')
def index():
    return 'Welcome to GeoPoster!'

    