function isIPhone3_2_Plus()
{
	if (Titanium.Platform.name == 'iPhone OS')
	{
		var version = Titanium.Platform.version.split(".");
		var major = parseInt(version[0]);
		var minor = parseInt(version[1]);

		if (major > 3 || (major == 3 && minor > 1))
		{
			return true;
		}
	}
	return false;
}

function translateErrorCode(code) {
	if (code == null) {
		return null;
	}
	switch (code) {
		case Ti.Geolocation.ERROR_LOCATION_UNKNOWN:
			return "Location unknown";
		case Ti.Geolocation.ERROR_DENIED:
			return "Access denied";
		case Ti.Geolocation.ERROR_NETWORK:
			return "Network error";
		case Ti.Geolocation.ERROR_HEADING_FAILURE:
			return "Failure to detect heading";
		case Ti.Geolocation.ERROR_REGION_MONITORING_DENIED:
			return "Region monitoring access denied";
		case Ti.Geolocation.ERROR_REGION_MONITORING_FAILURE:
			return "Region monitoring access failure";
		case Ti.Geolocation.ERROR_REGION_MONITORING_DELAYED:
			return "Region monitoring setup delayed";
	}
}

function findMe() {
  Titanium.Geolocation.getCurrentPosition(function(e) {
		var longitude, latitude;
    if (!e.success || e.error) {
			alert('Error: ' + translateErrorCode(e.code) + ". Setting a default location");
      latitude = 28.46149;
      longitude = -16.26592;
		}
    else {
		  longitude = e.coords.longitude;
		  latitude = e.coords.latitude;
    }

    app.mapView.hide();
    app.mapView.setLocation({latitude:latitude, longitude:longitude, latitudeDelta:0.0075, longitudeDelta:0.0075});
    app.mapView.show();
    try {
      //app.mapView.removeAnnotation('Estas aca');
    } catch(err){
    }
    app.locationMarker = Titanium.Map.createAnnotation({
      latitude:latitude,
      longitude:longitude,
      title:'Estas aca',
      pincolor:Titanium.Map.ANNOTATION_PURPLE,
      animate:true,
    });
    app.mapView.addAnnotation(app.locationMarker);
    app.infoButton.show();
  });
}


var geolocationEnabled = false;

if(isIPhone3_2_Plus()) {
  Titanium.Geolocation.purpose = "GPS demo";
}

if (Titanium.Geolocation.locationServicesEnabled == false) {
	Titanium.UI.createAlertDialog({
    title:'Atmoos',
    message:'Activa la Geolocalizacion para usar la aplicacion.'
  }).show();
}
else {
	if (Titanium.Platform.name != 'android') {
		var authorization = Titanium.Geolocation.locationServicesAuthorization;
		if (authorization == Titanium.Geolocation.AUTHORIZATION_DENIED) {
			Titanium.UI.createAlertDialog({
				title:'Atmoos',
				message:'No has autorizado a la aplicacion para acceder a los servicios de geolocalizacion.'
			}).show();
		}
		else if (authorization == Titanium.Geolocation.AUTHORIZATION_RESTRICTED) {
			Titanium.UI.createAlertDialog({
				title:'Atmoos',
				message:'No has autorizado a la aplicacion para acceder a los servicios de geolocalizacion.'
			}).show();
		}
	}

	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.distanceFilter = 10;

	var locationCallback = function(e)
	{
		if (!e.success || e.error)
		{
			return;
		}

		var longitude = e.coords.longitude;
		var latitude = e.coords.latitude;
		var altitude = e.coords.altitude;
		var heading = e.coords.heading;
		var accuracy = e.coords.accuracy;
		var speed = e.coords.speed;
		var timestamp = e.coords.timestamp;
		var altitudeAccuracy = e.coords.altitudeAccuracy;

    mapview.hide();
    mapview.setLocation({latitude:latitude, longitude:longitude, latitudeDelta:0.5, longitudeDelta:0.5});
    mapview.show();
	  //Titanium.Geolocation.addEventListener('location', locationCallback);
  };
}
