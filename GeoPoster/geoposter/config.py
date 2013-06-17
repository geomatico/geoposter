# -*- coding: utf-8 -*-
'''
Created on 10/06/2013

@author: michogarcia
'''

class DefaultConfig(object):
    """
    Default configuration for a geoposter application.
    """

    SQLALCHEMY_DATABASE_URI = "postgresql://geoposter:geoposter@192.168.0.199/geoposter"
    SQLALCHEMY_ECHO = True
    DEBUG = True
    
    USER = "geoposter"
    PASSWORD = "geoposter"
