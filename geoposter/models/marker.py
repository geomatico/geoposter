import uuid

from sqlalchemy import ForeignKey, Column, String
from geoalchemy2 import Geometry
from database import Base

class Marker(Base):
    
    __tablename__ = 'marker'
    
    id = Column(String(20), primary_key=True)
    title = Column(String(30), nullable=False)
    description = Column(String(254))
    geom = Column(Geometry(geometry_type='POINT', srid=4326)) 
    map_id = Column(String(20), ForeignKey('map.id'))
    
    def __init__(self, title, description):
        self.id = uuid.uuid4()
        self.title = title
        self.description = description
        
    def __repr__(self):
        return "<Marker('%s','%s', '%s')>" % (self.id, self.title, self.description)
    