import uuid

from sqlalchemy import ForeignKey, Column, String, Integer, func
from geoalchemy2 import Geometry
from database import Base

class Marker(Base):
    
    __tablename__ = 'marker'
    
    id = Column(String(20), primary_key=True)
    title = Column(String(30), nullable=False)
    description = Column(String(254))
    geom = Column(Geometry(geometry_type='POINT', srid=4326)) 
    user_id = Column(Integer, ForeignKey('user.id'))
    
    @property
    def serialize(self):
       '''
       markerserialize = {
           'id' : self.id,
           'title' : self.title,
           'description' : self.description,
           'geom' : self.geom.ST_AsGeoJSON() if (self.geom is not None) else None,
           'map_id' : self.map_id
       }
       '''
       geojson = func.ST_AsGeoJSON(self.geom)
       print(geojson)
       
       return  geojson #self.geom.ST_AsGeoJSON() if (self.geom is not None) else None
    
    def __init__(self, title, description):
        self.id = uuid.uuid4()
        self.title = title
        self.description = description
        
    def __repr__(self):
        return "<Marker('%s','%s', '%s')>" % (self.id, self.title, self.description)
    