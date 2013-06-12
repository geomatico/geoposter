var GeoPoster = {
	
	/**
	 * The version number
	 */
	VERSION : 1,
	
	/**
	 * 
	 */
	conector : null,
	
	/**
	 * 
	 */
	IConector : new IGeoPoster('IConector', ['save']),
	
	/**
	 * 
 	 * @param {Object} JSON
	 */
	save : function(JSON) {
		IGeoPoster.ensureImplements(this.conector, this.IConector)
		this.conector.save(JSON);
	}
}

