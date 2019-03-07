		//Gets the cookie with given c_name taken from w3school
		function getCookie(c_name) {
			var c_value = document.cookie;
			var c_start = c_value.indexOf(" " + c_name + "=");
			if (c_start == -1) {
				c_start = c_value.indexOf(c_name + "=");
			}
			if (c_start == -1) {
				c_value = null;
			} else {
				c_start = c_value.indexOf("=", c_start) + 1;
				var c_end = c_value.indexOf(";", c_start);
				if (c_end == -1) {
					c_end = c_value.length;
				}
				c_value = unescape(c_value.substring(c_start, c_end));
			}
			return c_value;
		}

		//Sets the cookie with given c_name to given value for exdays taken from w3school
		function setCookie(c_name, value, exdays) {
			var exdate = new Date();
			exdate.setDate(exdate.getDate() + exdays);
			var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
			document.cookie = c_name + "=" + c_value;
		}

		//Function for GUID creation
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
		};

		//Function for GUID creation
		function guid() {
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
					s4() + '-' + s4() + s4() + s4();
		}

		//Checks if the user has the cookie
		function checkCookie() {
			//attempts to get the cookie
			var user = getCookie("user");
			//If the user doesn't have a cookie
			if (user == null || user == "") {
				//Show message
				news();
				//Create a GUID
				user = guid();
				//Set the user's cookie to their GUID expiring in 365 days
				if (user != null && user != "") {
					setCookie("user", user, 365);
				}
			}
		}

		//on document.ready call checkCookie
		checkCookie();