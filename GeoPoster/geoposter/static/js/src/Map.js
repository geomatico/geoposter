/**
 * 
 * 
 * 
 * 
 * 
 * 
 */
GeoPoster.Map = function() {
	
	this.DEFAULTICON = L.icon({
						iconUrl : 'map-icons/pins/48/pin2.png',
						iconSize : [48, 48],
						iconAnchor : [24, 48]
				});
	
	this.SELECTEDICON = L.icon({
						iconUrl : 'map-icons/pins/48/pin1.png',
						iconSize : [48, 48],
						iconAnchor : [24, 48]
				});
	
	this.map = null;
	
	this.selectedItem = null;
	
	/**
	 * 
 	 * @param {Object} JSON
	 */
	this.save = function(markerAsJSON) {
		GeoPoster.conector.save(markerAsJSON);	
	};
	
	this.load = function(data) {

		L.geoJson(data, {
			context: this, 
			pointToLayer : function(feature, latlng) {
				return L.marker(latlng, {
					title : feature.properties.title,
					icon : L.icon({
						iconUrl : 'map-icons/pins/48/pin2.png',
						iconSize : [48, 48],
						iconAnchor : [24, 48]
					}),
					riseOnHover : true
				});
			},
			onEachFeature : function(feature, marker) {
				if (feature.properties && feature.properties.description != undefined && feature.properties.title != undefined) {
					marker.title = feature.properties.title;
					marker.content = feature.properties.description;
					marker.on('click', function(e) {
						this.context.selectItem(e.target);
					}, this);
					marker.on('dragstart', function(e) {
						this.context.selectItem(e.target);
					}, this);
					marker.on('dragend', function(e) {
						this.context.updateFeatureLocation(e.target);
					}, this);
				}
			}
		}).addTo(this.map); 
	}
	
	this.init = function(div) {
		
		var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/f9b48b21a87048bfb118148491d22ec5/{styleId}/256/{z}/{x}/{y}.png';
		var cloudmadeAttribution = 'Map data &copy; OpenStreetMap contributors, imagery &copy; CloudMade';

		ride = L.tileLayer(cloudmadeUrl, {
			styleId : 1714,
			attribution : cloudmadeAttribution
		});
		minimal = L.tileLayer(cloudmadeUrl, {
			styleId : 22677,
			attribution : cloudmadeAttribution
		});
		midnight = L.tileLayer(cloudmadeUrl, {
			styleId : 999,
			attribution : cloudmadeAttribution
		});

		this.map = L.map('map', {
			center : [41.437514611861786, 2.206707000732422],
			zoom : 12,
			maxBounds : [[-90, -180], [90, 180]],
			layers : [ride]
		});

		L.control.layers({
			"Ride" : ride,
			"Minimal" : minimal,
			"Midnight" : midnight
		}).addTo(this.map);

		GeoPoster.conector.load();

		$('#title').editable({
			mode : 'popup',
			placement : 'left',
			showbuttons : "bottom",
			animation : true,
			unsavedclass : null
		}).on('save', null, this, this.updateTitle);

		$('#content').editable({
			mode : 'popup',
			placement : 'left',
			showbuttons : "bottom",
			animation : true,
			unsavedclass : null,
			wysihtml5 : {
				"font-styles" : false, //Font styling, e.g. h1, h2, etc. Default true
				"emphasis" : true, //Italics, bold, etc. Default true
				"lists" : true, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
				"html" : false, //Button which allows you to edit the generated HTML. Default false
				"link" : true, //Button to insert a link. Default true
				"image" : true, //Button to insert an image. Default true,
				"color" : false //Button to change color of font
			}
		}).on('save', null, this, this.updateContent);

		$('#new').on('click', null, this, function(e) {
			
			var this_ = e.data;
			
			marker = L.marker(this_.map.getCenter(), {
				icon : L.icon({
						iconUrl : 'map-icons/pins/48/pin2.png',
						iconSize : [48, 48],
						iconAnchor : [24, 48]
					}),
				riseOnHover : true
			});

			marker.title = "Títol...";
			marker.content = "Contingut...";
			marker.on('click', function(e) {
				this_.selectItem(e.target);
			});
			marker.on('dragstart', function(e) {
				this_.selectItem(e.target);
			});
			marker.on('dragend', function(e) {
				this_.updateFeatureLocation(e.target);
			});

			marker.addTo(this_.map);

			marker.feature = {
				"type" : "Feature",
				"properties" : {
					"title" : "Títol...",
					"description" : "Contingut..."
				},
				"geometry" : {
					"type" : "Point",
					"coordinates" : [marker.getLatLng().lng, marker.getLatLng().lat]
				}
			};

			this_.save(marker.feature);

			this_.selectItem(marker);
		})		

		$('#map').on('keydown', null, this, function(e) {
			var this_ = e.data;
			var keycode = (e.keyCode ? e.keyCode : e.which);
			if (keycode == 46 || keycode == 8) {
				if (this_.selectedItem != null) {
					GeoPoster.conector.remove(this_.selectedItem.feature.properties.id)
					this_.map.removeLayer(this_.selectedItem);
					this_.selectedItem = null;
				}
			}
		})
	}
	
	this.selectItem = function(item) {
		if (this.selectedItem) {			
			this.selectedItem.dragging.disable();
			$(this.selectedItem._icon).removeClass("leaflet-marker-selected");
			this.selectedItem._icon.src = this.DEFAULTICON.options.iconUrl;
		}
		this.selectedItem = item;
		$(this.selectedItem._icon).addClass("leaflet-marker-selected");
		this.selectedItem._icon.src = this.SELECTEDICON.options.iconUrl;
		this.selectedItem.dragging.enable();

		$("#info").show();
		$("#title").editable('setValue', item.title);
		$("#content").editable('setValue', item.content);
	}

	this.updateFeatureLocation = function(event) {
		event.feature.geometry.coordinates = [event._latlng.lng, event._latlng.lat]
		GeoPoster.conector.update(event.feature);
	}

	this.updateTitle = function(e, params) {
		var item = e.data.selectedItem;
		item.feature.properties.title = params.newValue;
		item.title = params.newValue;
		item._icon.title = params.newValue;
		GeoPoster.conector.update(item.feature);
		// Ugly, but no accessor method
	}

	this.updateContent = function(e, params) {
		var item = e.data.selectedItem;
		item.feature.properties.description = params.newValue;
		item.content = params.newValue;
		GeoPoster.conector.update(item.feature);
	}

	this.saved = function(data) {
		console.log('saved', data)
		if (this.selectedItem.feature.properties.id == undefined) {
			this.selectedItem.feature.properties.id = data.marker_id;
		}
	}
	
	this.updated = function(data) {
		console.log('updated', data);
	}
	
	this.deleted = function(data) {
		console.log('deleted', data);
	}
}
