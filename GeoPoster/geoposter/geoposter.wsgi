import sys

sys.path.insert(0, '/home/michogarcia/geomati.co/Besos/dev/besos/GeoPoster/geoposter')

activate_this = '/home/michogarcia/geomati.co/Besos/dev/venv/bin/activate_this.py'
execfile(activate_this, dict(__file__=activate_this))

from run import app as application
application.secret_key = 'why would I tell you my secret key?'
