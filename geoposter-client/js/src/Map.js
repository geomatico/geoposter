/**
 * 
 * 
 * 
 * 
 * 
 * 
 */
GeoPoster.Map = function() {
	
	this.ERROR = {type : 'alert-error', title : 'Error'};
	this.SUCCESS = {type : 'alert-success', title : 'Success'};
	this.INFO = {type : 'alert-info', title : 'Information'};;
	
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
	this.lastStatus = null;
	
	/**
	 * 
	 */
	this.setSelectedItem = function(item) {
		if (item == null) {
			this.selectedItem = null;			
			this.lastStatus = null;			
		} else {
			this.selectedItem = item;			
			this.lastStatus = {
				latlng : item.getLatLng(),
				content : item.content,
				title : item.title 
			};			
		}
	}
	
	/**
	 * 
 	 * @param {Object} JSON
	 */
	this.save = function(markerAsJSON) {
		GeoPoster.conector.save(markerAsJSON);	
	};
	
	this.load = function(data, status) {

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
					$('#delete-marker').hide();
					$('#confirm-delete').show();				
				}
			}
		})

		$('#btn-delete').on('click', null, this, function(e) {
			var this_ = e.data;
			$('#delete-marker').hide();
			$('#confirm-delete').show();
		});
		
		$('#btn-delete-sure').on('click', null, this, function(e) {
			var this_ = e.data;
			this_.deleteMarker();
		}); 
		
		$('#btn-delete-cancel').on('click', null, this, function(e) {
			$('#delete-marker').show();
			$('#confirm-delete').hide();
		});
		
		$('#alert-dialog').hide();

	}
	
	this.deleteMarker = function() {
		GeoPoster.conector.remove(this.selectedItem.feature.properties.id)
	}
	
	this.selectItem = function(item) {
		if (this.selectedItem) {			
			this.selectedItem.dragging.disable();
			$(this.selectedItem._icon).removeClass("leaflet-marker-selected");
			this.selectedItem._icon.src = this.DEFAULTICON.options.iconUrl;
		}
		this.setSelectedItem(item);
		$(this.selectedItem._icon).addClass("leaflet-marker-selected");
		this.selectedItem._icon.src = this.SELECTEDICON.options.iconUrl;
		this.selectedItem.dragging.enable();

		$("#info").show();
		$('#delete-marker').show();
		$('#confirm-delete').hide();
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
	}

	this.updateContent = function(e, params) {
		var item = e.data.selectedItem;
		item.feature.properties.description = params.newValue;
		item.content = params.newValue;
		GeoPoster.conector.update(item.feature);
	}

	this.saved = function(data, status) {
		if (status == 'success') {
			if (this.selectedItem.feature.properties.id == undefined) {
				this.selectedItem.feature.properties.id = data.marker_id;
			}
			this.showAlert(this.SUCCESS, 'Marker saved!');
		} else {
			this.showAlert(this.ERROR, 'Marker not saved!');
			this.map.removeLayer(this.selectedItem);
			this.selectedItem = null;
		}
	}
	
	this.updated = function(data, status) {
		if (status == 'success') {
			this.showAlert(this.SUCCESS, 'Marker Updated!');
		} else {
			this.map.removeLayer(this.selectedItem);
			this.selectedItem.setLatLng(this.lastStatus.latlng);
			this.selectedItem.content = this.lastStatus.content;
			this.selectedItem.title = this.lastStatus.title
			this.selectedItem.feature.properties.content = this.lastStatus.content;
			this.selectedItem.feature.properties.title = this.lastStatus.title;
			this.selectedItem.feature.geometry.coordinates = [this.lastStatus.latlng.lng, this.lastStatus.latlng.lat];
			$("#title").editable('setValue', this.lastStatus.title);
			$("#content").editable('setValue', this.lastStatus.content);
			this.selectedItem.addTo(this.map);
			this.selectItem(this.selectedItem);
			this.showAlert(this.ERROR, 'Marker not updated!');
		}
	}
	
	this.deleted = function(data, status) {
		if (status == 'success') {
			this.showAlert(this.SUCCESS, 'Marker Deleted!');
			this.map.removeLayer(this.selectedItem);
			this.setSelectedItem(null);;
			$("#info").hide();
			$('#confirm-delete').hide();
		} else {
			this.showAlert(this.ERROR, 'Marker not deleted!');
		}
	}
	
	this.showAlert = function(type, message) {
		$('#alert-dialog').addClass(type.type);
		$('#alert-title').text(type.title);
		$('#alert-text').text(message);
		$('#alert-dialog').fadeIn(500);
		$('#alert-dialog').fadeOut(500);
	}
}
