==================
GeoPoster API REST
==================

Why this?
=========

GeoPoster API REST (named in tribute to another great API...) born to cover the next features:

* Publish a simple data model in web, the common marker with its user.
* Create a basic API bases in REST architecture with authentication using the more little framework that can do this.
* Be independent of the client.
* Be funny and simple to develop and meet the KISS principle.

You can do simple things using our API like:

* All CRUD operations with your markers.
* Share these markers with other users.

The GeoPoster API REST works in a Python server with a PostGIS database and publishes the results in GeoJSON then you'll be able to do all the simple things that you can imagine with these tools.

To install
==========

If you are a ninja developer in Python you will haven't any problem to install it, but if it is not the case you only need follow these simple instructions:

1. First, download it from our dist repository!.
2. Unpack it into your preferred folder.
3. Go to this folder an typed ``'python setup.py install'`` (without quotes), this will download all the necessary libraries to run the GeoPoster API REST in your server.

Now you will need to serve all API operations on the web. You can do this in several ways, one of them is using an Apache HTTP Sever. We understand that you have now an Apache HTTP Server running in your server, if this is not correct, you must to install and run it as fast as possible!. After this, you will need connect the HTTP Server with the GeoPoster API. To do this we will use WSGI (Web Server Gateway Interface). Ok, we know it, looks horrible, but we have here a very good instructions to do this very simple, remember, KISS!. You only will need to do some modifications into your Apache HTTP Server configuration file:

1. Using your favorite editor you can to open or create a file in the sites-available folder in Apache HTTP Server folder's root, for example in Linux distributions based in Debian this folder will be in ``'/etc/apache2/sites-available'`` (without quotes).
2. Add the necessary to make the connection::

	WSGIDaemonProcess geoposter user=www-data group=www-data threads=5
	WSGIScriptAlias /geoposter the path to /geoposter-api/geoposter/geoposter.wsgi
	WSGIPassAuthorization On

	<Directory the path to /geoposter-api/geoposter>
		WSGIProcessGroup geoposter
		WSGIApplicationGroup %{GLOBAL}
		Order deny,allow
		allow from all
	</Directory>

3. Modify the geoposter.wsgi file::

	sys.path.insert(0, 'the path to /geoposter-api/geoposter')
	
4. If you are not using virtualenv in your server remove or comment this lines from the ``geoposter.wsgi`` file::

	activate_this = 'the path to your virtualenv /venv/bin/activate_this.py'
	execfile(activate_this, dict(__file__=activate_this))
	
5. Reload or Restart the Apache HTTP Server and enjoy it!. You can see the logs from the GeoPoster API in the ``error.log`` file in the Apache folder's log.
	
To develop
==========

You can develop in the GeoPoster REST API like another Python project. In order to use the smallest framework possible we decide to use Flask. Flask allows make good web services on REST easily and funny. To manage the database we use GeoAlchemy 2. This project is an ORM with spatial features that allowing us to manage the database easily too. You'll find more documentation about these projects in its web. 

To starts to develope on the GeoPoster API REST project:

1. Clone the GitHub repository::

	git clone ....
	
2. Creates a virtual environment in the folder that you wants::

	$ mkdir myproject
	$ cd myproject
	$ virtualenv venv
	New python executable in venv/bin/python
	Installing distribute............done.

3. Activate this virtualenv::

	. venv/bin/activate
	
4. Install the GeoPoster, type next in the geoposter-api folder's root::

	python setup.py install
	
5. Import the project on your favorite IDE.

	

