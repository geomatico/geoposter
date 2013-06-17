GeoPoster.GPException = function(message, code) {
	
	this.message = message;
	
	this.code = code;
	
	this.prototype.toString = function() {
		return "Exception: " + this.message + " code: " + this.code.toString();
	}
}
