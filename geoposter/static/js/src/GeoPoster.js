var GeoPoster = {
	
	/**
	 * The version number
	 */
	VERSION : 1,
	
	/**
	 * 
	 */
	map : null,
	
	/**
	 * 
	 */
	conector : null,
	
	/**
	 * 
	 */
	setConector : function(conector) {
		IConector.ensureImplements(conector, this.IConector)
		this.conector = conector;
	},
	
	/**
	 * 
	 */
	IConector : new IConector('IConector', ['save', 
											'load',
											'update'])
}