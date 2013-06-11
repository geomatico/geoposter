'''
Created on 10/06/2013

@author: michogarcia
'''
from config import DefaultConfig
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine(DefaultConfig.SQLALCHEMY_DATABASE_URI, echo=DefaultConfig.SQLALCHEMY_ECHO)

Base = declarative_base()

def init_db():
    
    from models import map, marker, user 
    Base.metadata.create_all(engine)