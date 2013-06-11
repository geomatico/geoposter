'''
Created on 11/06/2013

@author: michogarcia
'''

from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship, backref
from database import Base

class User(Base):
    
    __tablename__ = 'user'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(30), nullable=None)
    email = Column(String(30), nullable=None)
    maps = relationship("Map", backref=backref('maps'))
    