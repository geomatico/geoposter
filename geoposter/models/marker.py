import uuid

from sqlalchemy import ForeignKey, Column, String, Integer
from geoalchemy2 import Geometry
from database import Base
from flask import json

class Marker(Base):
    
    TYPE = 'POINT'
    
    __tablename__ = 'marker'
    
    fid = Column(Integer, primary_key=True, autoincrement=True)
    id = Column(String(20), nullable=False)
    title = Column(String(30), nullable=False)
    description = Column(String(254))
    geom = Column(Geometry(geometry_type=TYPE, srid=4326))
    user_id = Column(Integer, ForeignKey('user.id'))
    
    @property
    def AsGeoJSON(self):
        JSON = {'type' : 'Feature', 'geometry' : json.loads(self.geom) , 'properties' : [{'fid' : self.fid, 'id' : self.id, 'title' : self.title, 'description' : self.description }]}
         
        return JSON
    
    def __init__(self, title, description):
        self.id = uuid.uuid4()
        self.title = title
        self.description = description
        
    def __repr__(self):
        return "<Marker('%s','%s', '%s', '%s')>" % (self.id, self.title, self.description, self.geom)
    
