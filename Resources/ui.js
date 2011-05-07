var app = {};

app.window = Titanium.UI.createWindow({
    title:'Atmoos',
    backgroundColor:'#fff'
});

app.label = Titanium.UI.createLabel({
	color:'#999',
	text:'Atmoos',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto',
  height: 50,
  top: 0
});

app.mapview = Titanium.Map.createView({
	mapType: Titanium.Map.HYBRID_TYPE,
	region:{latitude:28.1291, longitude:-15.4306, latitudeDelta:0.5, longitudeDelta:0.5},
	animate:true,
	regionFit:true,
	userLocation:true,
  top: 50,
  height: 300
});

app.window.add(app.label);
app.window.add(app.mapview);
