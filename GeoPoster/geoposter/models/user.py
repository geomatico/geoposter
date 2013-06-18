'''
Created on 11/06/2013

@author: michogarcia
'''

from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship, backref
from database import Base

class User(Base):
    
    __tablename__ = 'user'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(30), nullable=None)
    email = Column(String(30), nullable=None)
    password = Column(String(30), nullable=None)
    markers = relationship("Marker", backref=backref('markers'))
    
    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return unicode(self.id)
    
    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password
        
    def __repr__(self):
        return "<User ('%s','%s', '%s')>" % (self.name, self.email, self.password)
    