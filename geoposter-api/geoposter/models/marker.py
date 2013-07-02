import uuid

from sqlalchemy import ForeignKey, Column, String, Text, Integer
from geoalchemy2 import Geometry
from database import Base
from flask import json

class Marker(Base):
    
    SRID = 4326
    TYPE = 'POINT'
    LAT = 1
    LON = 0
    
    __tablename__ = 'marker'
    
    fid = Column(Integer, primary_key=True, autoincrement=True)
    id = Column(String(40), nullable=False)
    title = Column(String(30), nullable=False)
    description = Column(Text)
    geom = Column(Geometry(geometry_type=TYPE, srid=SRID))
    user_id = Column(Integer, ForeignKey('user.id'))
    
    @property
    def AsGeoJSON(self):
        JSON = {'type' : 'Feature', 'geometry' : json.loads(self.geom) , 'properties' : {'fid' : self.fid, 'id' : self.id, 'title' : self.title, 'description' : self.description }}
         
        return JSON
    
    def __init__(self, markerAsJSON):
        self.id = str(uuid.uuid4())
        self.title = markerAsJSON['properties']['title']
        self.description = markerAsJSON['properties']['description']
        self.geom = 'SRID=' + str(self.SRID) + ';' + self.TYPE + '(' + str(markerAsJSON['geometry']['coordinates'][self.LON]) + ' ' + str(markerAsJSON['geometry']['coordinates'][self.LAT]) + ')'
        
    def __repr__(self):
        return "<Marker('%s','%s', '%s', '%s')>" % (self.id, self.title, self.description, self.geom)
    
