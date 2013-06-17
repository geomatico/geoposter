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

$(document).ready(function() {
	GeoPoster.setConector(new ConectorREST('http://localhost:5000/geoposter'));
	GeoPoster.map = new GeoPoster.Map();
	GeoPoster.map.init();
});

