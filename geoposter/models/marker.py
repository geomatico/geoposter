import uuid

from sqlalchemy import ForeignKey, Column, String, Integer
from geoalchemy2 import Geometry
from database import Base

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
    def AsJSON(self):
        JSON = '{type: Feature, geometry:' + self.geom + ', properties: {fid: ' + str(self.fid) + '\
                , id:' + self.id + ', title: ' + self.title + ', description: ' + self.description + '}}' 
        return JSON
    
    def __init__(self, title, description):
        self.id = uuid.uuid4()
        self.title = title
        self.description = description
        
    def __repr__(self):
        return "<Marker('%s','%s', '%s', '%s')>" % (self.id, self.title, self.description, self.geom)
    
