##
## @author: Micho Garcia
##
import uuid

from sqlalchemy import Column, String
from database import Base

class Map(Base):
    
    __tablename__ = 'map'
    
    id = Column(String(20), primary_key=True)
    
    def __init__(self):    
        self.id = uuid.uuid4()
        
    def __repr__(self):
        return "<Map('%s')>" % (self.id)        
    