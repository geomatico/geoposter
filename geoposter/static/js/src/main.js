/**
 * @author Micho García
 */

/*
 * TODO:
 *
 * - Add new
 * - Delete
 * - Title & content vs. Name & Description
 * - No IDs, using titles
 * - Naming: Item, Feature, Marker, Layer, & different functions
 * - Separate editable vs. non-editable
 * - Persist in server
 * - Authentication
 */

var map;
var data;
var selectedItem;

var defaultIconUrl = 'map-icons/pins/48/pin2.png';
var selectedIconUrl = 'map-icons/pins/48/pin1.png';

var defaultIcon = L.icon({
	iconUrl : defaultIconUrl,
	iconSize : [48, 48],
	iconAnchor : [24, 48]
});

function init() {
	cloudmadeUrl = 'http://{s}.tile.cloudmade.com/f9b48b21a87048bfb118148491d22ec5/{styleId}/256/{z}/{x}/{y}.png';
	cloudmadeAttribution = 'Map data &copy; OpenStreetMap contributors, imagery &copy; CloudMade';

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

	map = L.map('map', {
		center : [41.437514611861786, 2.206707000732422],
		zoom : 12,
		maxBounds : [[-90, -180], [90, 180]],
		layers : [ride]
	});

	L.control.layers({
		"Ride" : ride,
		"Minimal" : minimal,
		"Midnight" : midnight
	}).addTo(map);

	load();

	$('#title').editable({
		mode : 'popup',
		placement : 'left',
		showbuttons : "bottom",
		animation : true,
		unsavedclass : null
	}).on('save', updateTitle);

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
	}).on('save', updateContent);

	$("#new").click(function() {
		marker = L.marker(map.getCenter(), {
			icon : defaultIcon,
			riseOnHover : true
		});

		marker.title = "Títol...";
		marker.content = "Contingut...";
		marker.on('click', function(e) {
			selectItem(e.target);
		});
		marker.on('dragstart', function(e) {
			selectItem(e.target);
		});
		marker.on('dragend', function(e) {
			updateFeatureLocation(e.target);
		});

		marker.addTo(map);
		data.features.push({
			"type" : "Feature",
			"properties" : {
				"Name" : "Títol...",
				"Description" : "Contingut..."
			},
			"geometry" : {
				"type" : "Point",
				"coordinates" : [2, 41]
			}
		});
		save();
		selectItem(marker);
	});
}

function load() {

	$.ajax({
		url: 'http://localhost:5000/geoposter/marker',
		success : function(data, status) {
			L.geoJson(data, {
				pointToLayer : function(feature, latlng) {
					return L.marker(latlng, {
						title : feature.properties.title,
						icon : defaultIcon,
						riseOnHover : true
					});
				},
				onEachFeature : function(feature, marker) {
					if (feature.properties && feature.properties.description && feature.properties.title) {
						marker.title = feature.properties.title;
						marker.content = feature.properties.description;
						marker.on('click', function(e) {
							selectItem(e.target);
						});
						marker.on('dragstart', function(e) {
							selectItem(e.target);
						});
						marker.on('dragend', function(e) {
							updateFeatureLocation(e.target);
						});
					}
				}
			}).addTo(map);
		}
	})
}

function save() {
	localStorage.setItem("data", JSON.stringify(data));
}

function selectItem(item) {
	if (selectedItem) {
		selectedItem.dragging.disable();
		$(selectedItem._icon).removeClass("leaflet-marker-selected");
		selectedItem._icon.src = defaultIconUrl;
	}
	selectedItem = item;
	$(selectedItem._icon).addClass("leaflet-marker-selected");
	selectedItem._icon.src = selectedIconUrl;
	selectedItem.dragging.enable();

	$("#info").show();
	$("#title").editable('setValue', item.title);
	$("#content").editable('setValue', item.content);
}

function updateFeatureLocation(item) {
	getSelectedFeature().geometry.coordinates = [item.getLatLng().lng, item.getLatLng().lat];
	save();
}

function updateTitle(e, params) {
	getSelectedFeature().properties.title = params.newValue;
	save();
	selectedItem.title = params.newValue;
	selectedItem._icon.title = params.newValue;
	// Ugly, but no accessor method
}

function updateContent(e, params) {
	getSelectedFeature().properties.Description = params.newValue;
	save();
	selectedItem.content = params.newValue;
}

function getSelectedFeature() {
	return data.features.filter(function (feature) {
	return feature.properties.title == selectedItem.title;
	})[0];
}

