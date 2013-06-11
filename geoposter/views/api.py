'''
Created on 11/06/2013

@author: michogarcia
'''
from flask import Blueprint

api = Blueprint('api', __name__, url_prefix='/api')

@api.route('/')
def index():
    return 'Welcome to GeoPoster!'

    