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
  url = "http://atmoos.heroku.com/stations/"+id+".json";
  var request = Titanium.Network.createHTTPClient();
  request.onload = function() {
    var jsonObject = JSON.parse(this.responseText);
    Ti.API.info(jsonObject);
  };
  request.open("GET","http://atmoos.heroku.com/stations/"+id+".json");
  request.send();
}
