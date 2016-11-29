# -*- coding: utf-8 -*-
'''
Created on 10/06/2013

@author: michogarcia
'''

class DefaultConfig(object):
    """
    Default configuration for a geoposter application.
    """

    SQLALCHEMY_DATABASE_URI = "postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}"
    SQLALCHEMY_ECHO = True
    DEBUG = True

    USER = "${API_USER}"
    PASSWORD = "${API_PASS}"
