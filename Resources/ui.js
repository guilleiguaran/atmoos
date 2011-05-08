var app = {};

app.nearestStation = null;

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

app.statusImage = Titanium.UI.createImageView({
  image:'./images/nodisponible.png',
  backgroundColor: '#e9f0f9',
	height:75,
  width:'167',
	top:80
});

app.statusLb1 = Titanium.UI.createLabel({
    text:'En estos momentos no es posible mostrar la información. Esperemos que se resuelva pronto.',
    height:'auto',
    width:'auto',
    top:170,
    left:5,
    color:'#393939',
    font:{fontSize:13}
});

app.statusLb2 = Titanium.UI.createLabel({
    text:'',
    height:'auto',
    width:'auto',
    top:240,
    color:'#393939',
    font:{fontSize:10}
});

app.infoButton.addEventListener('click',function(){
  station = app.nearestStation;
  if(station.no2 == "Regular" || station.o3 == "Regular" || station.particles == "Regular" || station.so2 == "Regular") {
    app.statusText = "regular"
    app.statusImage.image = './images/regular.png'
    app.statusLb1.text = "El aire de tu zona no está limpio. Es un buen momento para empezar a usar el transporte público. ¿Qué más se te ocurre?";
    app.statusLb2.text = "Uno o varios de los contaminantes (SO2 NO2 Particulas y O3) se encuentran  entre el 50-100% del valor límite estalecido por las Directivas Europeas.";
  } else if(station.no2 == "Mala" || station.o3 == "Mala" || station.particles == "Mala" || station.so2 == "Mala") {
    app.statusText = "mala"
    app.statusImage.image = './images/malo.png'
    app.statusLb1.text = "El aire supera los límites de contaminación y puede ser perjudicial para la salud. Informa de ello. ¿Qué crees que podemos hacer?";
    app.statusLb2.text = "Uno o varios de sus contaminantes (SO2 NO2 Particulas y O3) se encuentran por encima de los límitesestablecidos por las  Directivas Europeas.";
  } else if(station.no2 == "No Disponible" && station.o3 == "No Disponible" && station.particles == "No Disponible" && station.so2 == "No Disponible") {
    app.statusText = "desconocida"
    app.statusImage.image = './images/nodisponible.png'
    app.statusLb1.text = "En estos momentos no es posible mostrar la información. Esperemos que se resuelva pronto.";
    app.statusLb2.text = "";
  } else {
    app.statusText = "buena"
    app.statusImage.image = './images/bueno.png'
    app.statusLb1.text = "Hoy el aire es puro y limpio, así que ¡salgamos a disfrutarlo! El aire nos importa, ayuda a mantenerlo siempre limpio animando a usar transportes como la bici.";
    app.statusLb2.text = "Todos los componentes analizados del aire (SO2 NO2 Particulas y O3) están por debajo del 50% del valor límite establecido por las Directivas Europeas.";
  }
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
  left:250,
  borderColor:null,
  borderRadius:0,
  style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
});

app.aboutButton.addEventListener('click',function(){
  Ti.Platform.openURL("http://atmoos.heroku.com");
});

app.homeButton = Titanium.UI.createButton({
  image:'./images/inicio.png',
	height:'61',
	width:'61',
	top:405,
  left:20,
  borderColor:null,
  borderRadius:0,
  style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
});

app.homeButton.addEventListener('click',function(){
  app.detailsWindow.close();
  app.window.open();
  getStations();
});

app.compartirImage = Titanium.UI.createImageView({
  image:'./images/compartir.png',
	height:20,
  width:87,
	top:320,
  left:5
});

app.facebookShareButton = Titanium.UI.createButton({
  image:'./images/facebook.png',
	height:'55',
	width:'54',
	top:300,
  left:120,
  borderColor:null,
  borderRadius:0,
  style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
});

app.twitterShareButton = Titanium.UI.createButton({
  image:'./images/twitter.png',
	height:'55',
	width:'54',
	top:300,
  left:190,
  borderColor:null,
  borderRadius:0,
  style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
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
app.detailsWindow.add(app.statusImage);
app.detailsWindow.add(app.statusLb1);
app.detailsWindow.add(app.statusLb2);
app.detailsWindow.add(app.footerView);
app.detailsWindow.add(app.homeButton);
app.detailsWindow.add(app.aboutButton);
app.detailsWindow.add(app.compartirImage);
app.detailsWindow.add(app.facebookShareButton);
app.detailsWindow.add(app.twitterShareButton);
