var ConectorREST =  function(URL) {
	
	this.URL = URL;
	
	this.load = function() {
		$.ajax({
			url: this.URL + '/marker',
			dataType : 'json',
			beforeSend: function (xhr){ 
					        xhr.setRequestHeader('Authorization', GeoPoster.auth); 
			},
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
			dataType : 'json',
			headers : {
				'Content-Type' : 'application/json; charset=UTF-8'
			},
			beforeSend: function (xhr){ 
					        xhr.setRequestHeader('Authorization', GeoPoster.auth); 
			},
			success : function(data, status) {
				GeoPoster.map.saved(data);
			},
			error : function(data, status) {
				GeoPoster.map.saved(data);
			}
		})
	};
	
	this.update = function(markerAsJSON) {
		$.ajax({
			url : this.URL + '/marker/' + markerAsJSON.properties.id,
			type : 'PUT',
			data : JSON.stringify(markerAsJSON),
			context : this,
			dataType : 'json',
			headers : {
				'Content-Type' : 'application/json; charset=UTF-8'
			},
			beforeSend: function (xhr){ 
					        xhr.setRequestHeader('Authorization', GeoPoster.auth); 
			},
			success : function(data, status) {
				GeoPoster.map.updated(data);
			},
			error : function(data, status) {
				GeoPoster.map.updated(data);
			}
		})		
	};
	
	this.remove = function(marker_id) {
		$.ajax({
			url : this.URL + '/marker/' + marker_id,
			type : 'DELETE',
			context : this,
			dataType : 'json',
			headers : {
				'Content-Type' : 'application/json; charset=UTF-8'
			},
			beforeSend: function (xhr){ 
					        xhr.setRequestHeader('Authorization', GeoPoster.auth); 
			},
			success : function(data, status) {
				GeoPoster.map.deleted(data);
			},
			error : function(data, status) {
				GeoPoster.map.deleted(data);
			}
		})
	}
}
