##
## @author: Micho Garcia
##
import uuid

from sqlalchemy import ForeignKey, Column, String, Integer
from sqlalchemy.orm import relationship, backref
from database import Base

class Map(Base):
    
    __tablename__ = 'map'
    
    id = Column(String(20), primary_key=True)
    markers = relationship("Marker", backref=backref('markers'))
    user_id = Column(Integer, ForeignKey('user.id'))
    
    def __init__(self):    
        self.id = uuid.uuid4()
        
    def __repr__(self):
        return "<Map('%s')>" % (self.id)        
    