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
	GeoPoster.setConector(new ConectorREST(GeoPoster.URLAPI));
	GeoPoster.map = new GeoPoster.Map();
	GeoPoster.map.init();

	// Login
	var name = $("#username"),
	password = $("#password"), 
	allFields = $([]).add(name).add(password), 
	tips = $(".validateTips");

	function updateTips(t) {
		tips.text(t).addClass("ui-state-highlight");
		setTimeout(function() {
			tips.removeClass("ui-state-highlight", 1500);
		}, 500);
	}

	function checkLength(o, n, min, max) {
		if (o.val().length > max || o.val().length < min) {
			o.addClass("ui-state-error");
			updateTips("Length of " + n + " must be between " + min + " and " + max + ".");
			return false;
		} else {
			return true;
		}
	}

	function checkRegexp(o, regexp, n) {
		if (!( regexp.test(o.val()) )) {
			o.addClass("ui-state-error");
			updateTips(n);
			return false;
		} else {
			return true;
		}
	}
	
	function make_base_auth(user, password) {
		var tok = user + ':' + password;
		var hash = btoa(tok);
		return "Basic " + hash;
	}

	$("#dialog-form").dialog({
		autoOpen : false,
		height : 300,
		width : 350,
		modal : true,
		closeOnEscape : false,
		buttons : {
			"Sign in" : function() {
				var bValid = true;
				allFields.removeClass("ui-state-error");

				bValid = bValid && checkLength(name, "username", 3, 16);
				bValid = bValid && checkLength(password, "password", 4, 16);

				bValid = bValid && checkRegexp(name, /^[a-z]([0-9a-z_])+$/i, "Username may consist of a-z, 0-9, underscores, begin with a letter.");
				// From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
				bValid = bValid && checkRegexp(password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9");

				if (bValid) {
					$.ajax({
						url: GeoPoster.URLAPI + '/login',
						type : 'POST',
						beforeSend: function (xhr){ 
					        xhr.setRequestHeader('Authorization', make_base_auth(name.val(), password.val())); 
					    },
					    success : function(data, status) {					    	
					    	GeoPoster.auth = make_base_auth(name.val(), password.val())
					    	GeoPoster.conector.load();
					    	$("#dialog-form").dialog("close");
					    },
					    error : function(data, status) {
					    	updateTips(data.statusText.toUpperCase());
					    }
					})
				}
			}
		},
		close : function() {
			allFields.val("").removeClass("ui-state-error");
		}
	});

	$("#dialog-form").dialog("open");

});

