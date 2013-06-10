# -*- coding: utf-8 -*-
'''
Created on 10/06/2013

@author: michogarcia
'''
from database import init_db
from config import DefaultConfig
from flask import Flask


DEFAULT_APP_NAME = "geoposter"


def create_app(config=None, app_name=None):
    
    if app_name is None:
        app_name = DEFAULT_APP_NAME
    
    app = Flask(app_name)
    
    configure_app(app, config)
    init_db()
    
    return app

def configure_app(app, config):
    
    app.config.from_object(DefaultConfig())

    if config is not None:
        app.config.from_object(config)

    app.config.from_envvar('APP_CONFIG', silent=True)
    
if __name__ == '__main__':
    
    app = create_app()
    app.run();
    