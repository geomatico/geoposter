var ConectorREST =  function(URL) {
	
	this.URL = URL;
	
	this.load = function() {
		$.ajax({
			url: this.URL + '/marker',
			success : function(data, status) {
				GeoPoster.map.load(data);
			}
		})
	};

	this.save = function(markerAsJSON){
		$.ajax({
			url : this.URL + '/marker',
			type : 'POST',
			data : JSON.stringify(markerAsJSON),
			context : this,
			headers : {
				'Content-Type' : 'application/json; charset=UTF-8'
			},
			success : function(data, status) {
				GeoPoster.map.saved({success : true, data : data});
			},
			error : function(data, status) {
				GeoPoster.map.saved({success : false, data : data});
			}
		})
	};
	
	this.update = function(markerAsJSON) {
		$.ajax({
			url : this.URL + '/marker/' + markerAsJSON.properties.id,
			type : 'PUT',
			data : JSON.stringify(markerAsJSON),
			context : this,
			headers : {
				'Content-Type' : 'application/json; charset=UTF-8'
			},
			success : function(data, status) {
				GeoPoster.map.updated({success : true, data : data});
			},
			error : function(data, status) {
				GeoPoster.map.updated({success : false, data : data});
			}
		})		
	}
}
