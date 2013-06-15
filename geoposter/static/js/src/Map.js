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
	
	this.selectItem = null;
	
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
				if (feature.properties && feature.properties.description && feature.properties.title) {
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
		}).on('save', this.updateTitle);

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
		}).on('save', this.updateContent);

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
				this_.updateFeatureLocation(e);
			});

			marker.addTo(this_.map);

			markerJSON = {
				"type" : "Feature",
				"properties" : {
					"title" : "Títol...",
					"description" : "Contingut..."
				},
				"geometry" : {
					"type" : "Point",
					"coordinates" : [marker.getLatLng().lat, marker.getLatLng().lng]
				}
			};

			this_.save(markerJSON);

			this_.selectItem(marker);
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

	}

	this.updateTitle = function(e, params) {
		this.getSelectedFeature().properties.title = params.newValue;
		this.save();
		this.selectedItem.title = params.newValue;
		this.selectedItem._icon.title = params.newValue;
		// Ugly, but no accessor method
	}

	this.updateContent = function(e, params) {
		this.getSelectedFeature().properties.description = params.newValue;
		this.save();
		this.selectedItem.content = params.newValue;
	}

	this.getSelectedFeature = function(feature) {
		return data.features.filter(function (feature) {
			return feature.properties.title == selectedItem.title;
		})[0];
	}
	
	this.saved = function(data) {

	}	
}
