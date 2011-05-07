var app = {};

app.window = Titanium.UI.createWindow({
    title:'Atmoos',
    backgroundColor:'#e7eff9'
});

app.label = Titanium.UI.createLabel({
	color:'#999',
	text:'Atmoos',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto',
  height: 60,
  top: 20,
  shadowColor: '#e9f0f9'
});

app.logoImage = Titanium.UI.createImageView({
	image:'./images/Atmoos.png',
  backgroundColor: '#e9f0f9',
	height:50,
  width:'auto',
	top:10,
});

app.mapView = Titanium.Map.createView({
	mapType: Titanium.Map.STANDARD_TYPE,
	region:{latitude:28.1291, longitude:-15.4306, latitudeDelta:0.5, longitudeDelta:0.5},
	animate:true,
	regionFit:true,
	userLocation:true,
  top: 60,
  height: 290
});

app.findButton = Titanium.UI.createButton({
	title:'I am a Button',
	height:40,
	width:200,
	top:10
});

app.window.add(app.logoImage);
app.window.add(app.mapView);
