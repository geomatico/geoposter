================
GeoPoster Client
================

The GeoPoster Client is a simple map viewer that connects with the GeoServer API REST. Is made with LeafLet.js to manage the maps and Bootstrap framework to the user interface part. 

To install
==========

1. Download from our dist repository, uncompress in your desired folder and points your HTTP Server to this folder. If you are using Apache HTTP Server, you'll need only add this code to the sites-enable file::

	Alias /geoposter <path to the folder /geoposter-client>
	
	<Directory <path to the folder /geoposter-client>>
		Options Indexes MultiViews FollowSymLinks
		AllowOverride All
		Order deny,allow
		Allow from all
	</Directory>
	
2. Configure the connection from the GeoPoster Client with the GeoPoster API REST adding the URL of this in the GeoPoster.js file::

	 */
	URLAPI : 'URL to the GeoPoster API REST',

To develop
==========

To develop in the GeoPoster Client you don't need any more special knowledge that you need to develop in a common Javascript project. Perhaps the only difference is in the architecture of the GeoPoster Client. To make it more independent we have develop an interface that needs to be implemented by the connector. In our GeoPoster Client there is a connector REST that connects it with the GeoPoster API REST, is the ConnectorREST (``ConnectorREST.js``). If you wants connect with other data source you'll need makes a connector that implements four methods:

* save(marker as GeoJSON)
* load()
* delete(marker ID)
* update(marker as GeoJSON)

In these methods you'll need to call to the GeoPoster callbacks to comunicate your connector with the Map, for example::

	this.save = function(markerGeoJSON) {
		...
		Make the call to save the marker in your datasource
		
		// This calls to the Map callback
		GeoPoster.map.saved(data, status);
	{
	
The Map have four callbacks:

* load(data, status)
* saved(data, status)
* updated(data, status)
* deleted(data, status)

In the **data** parameter must receive the response of your server:

* load(data, status), data is the GeoJSON with all the features
* save(data, status), data is an object with de marker ID
* update(data, status), this data is not using
* delete(data, status), this data is not using

and the **status** parameter must receive a string with ``success`` or ``error`` depending if the request is OK or not.

To add your connector to the GeoPoster first load the script in the ``index.html``::

    <script type="text/javascript" src="your connector"></script>
    
In the main (main.js) sets the connector to the GeoPoster, to do this replace this line with your connector::

	GeoPoster.setConector(<the instance of your connector>);

  
