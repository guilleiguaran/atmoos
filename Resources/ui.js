var app = {};

app.window = Titanium.UI.createWindow({
    title:'Atmoos',
    backgroundColor:'#e7eff9'
});

app.detailsWindow = Titanium.UI.createWindow({
    title:'Atmoos',
    backgroundColor:'#e7eff9'
});

app.logoImage = Titanium.UI.createImageView({
	image:'./images/Atmoos.png',
  backgroundColor: '#e9f0f9',
	height:50,
  width:'172',
	top:10
});

app.mapView = Titanium.Map.createView({
	mapType: Titanium.Map.STANDARD_TYPE,
	region:{latitude:28.46149, longitude:-16.26592, latitudeDelta:0.0075, longitudeDelta:0.0075},
	animate:true,
	regionFit:true,
	userLocation:true,
  top: 60,
  height: 280,
  borderColor:'#34410a'
});
getStations();

app.findButton = Titanium.UI.createButton({
  image:'./images/localizame.png',
	height:29,
	width:'auto',
	top:360,
  left:20,
  borderColor:null,
  borderRadius:0,
  style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
});

app.infoButton = Titanium.UI.createButton({
  image:'./images/info.png',
	height:'71',
	width:'62',
	top:340,
  left:240,
  borderColor:null,
  borderRadius:0,
  style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
});
app.infoButton.hide();

app.infoButton.addEventListener('click',function(){
  app.window.close();
  app.detailsWindow.open();
});

app.findButton.addEventListener('click',function(){
  findMe();
});

app.footerView = Titanium.UI.createView({
  backgroundColor:'#7d995c',
  width:'320',
  height:'80',
  top:410
});

app.facebookButton = Titanium.UI.createButton({
  image:'./images/facebook.png',
	height:'40',
	width:'39',
	top:415,
  left:70,
  borderColor:null,
  borderRadius:0,
  style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
});

app.facebookButton.addEventListener('click',function(){
  Ti.Platform.openURL("http://m.facebook.com/pages/atmoos/189155371130569");
});

app.twitterButton = Titanium.UI.createButton({
  image:'./images/twitter.png',
	height:'40',
	width:'39',
	top:415,
  left:140,
  borderColor:null,
  borderRadius:0,
  style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
});

app.twitterButton.addEventListener('click',function(){
  Ti.Platform.openURL("http://mobile.twitter.com/atmoos");
});

app.aboutButton = Titanium.UI.createButton({
  image:'./images/acerca.png',
	height:'61',
	width:'61',
	top:405,
  left:210,
  borderColor:null,
  borderRadius:0,
  style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
});

app.aboutButton.addEventListener('click',function(){
  Ti.Platform.openURL("http://atmoos.heroku.com");
});

app.window.add(app.logoImage);
app.window.add(app.findButton);
app.window.add(app.infoButton);
app.window.add(app.mapView);
app.window.add(app.footerView);
app.window.add(app.facebookButton);
app.window.add(app.twitterButton);
app.window.add(app.aboutButton);

app.detailsWindow.add(app.logoImage);
app.detailsWindow.add(app.footerView);
