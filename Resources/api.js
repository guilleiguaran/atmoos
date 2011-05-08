function getStations() {
  var request = Titanium.Network.createHTTPClient();
  request.onload = function() {
    var stations = JSON.parse(this.responseText);

    for(i = 0; i < stations.length; i++) {
      var marker = Titanium.Map.createAnnotation({
        latitude:stations[i].latitude,
        longitude:stations[i].longitude,
        title:stations[i].name,
        pincolor:Titanium.Map.ANNOTATION_RED,
        animate:true,
      });
      app.mapView.addAnnotation(marker);
    }

  };
  request.open("GET","http://atmoos.heroku.com/stations.json");
  request.send();
}

function getStation(id) {
  var request = Titanium.Network.createHTTPClient();
  request.onload = function() {
    var station = JSON.parse(this.responseText);
  };
  request.open("GET","http://atmoos.heroku.com/stations/"+id+".json");
  request.send();
}

function search(latitude, longitude) {
  var request = Titanium.Network.createHTTPClient();
  request.onload = function() {
    station = JSON.parse(this.responseText);
    Ti.API.info(this.responseText);
    Ti.API.info(station);
    app.nearestStation = station;
  };
  request.open("GET","http://atmoos.heroku.com/stations/search.json?latitude="+latitude+"&longitude="+longitude);
  request.send();
}
