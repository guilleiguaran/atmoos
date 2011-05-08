Titanium.Facebook.appid = "146517992085577";
Titanium.Facebook.permissions = ['publish_stream'];
var facebook_dialog = false;

app.facebookButton.addEventListener('click', function(){
  if(Titanium.Facebook.loggedIn) {
    send_facebook_stream();
  }
  else {
    Titanium.Facebook.authorize();
    Titanium.Facebook.addEventListener('login',function(e) {
      Titanium.API.info('FACEBOOK LOGIN DATA'+e.data);
      send_facebook_stream();
    });
  }

  function send_facebook_stream() {
    var data = {
      name:'Atmoos',
      link:"http://atmoos.es",
      description:"Aplicacion movil/web para medicion de calidad del aire en las Islas Canarias",
      message: "La calidad del aire cerca de [lugar] es [calidad]"
    };

    Titanium.Facebook.requestWithGraphPath('me/feed', data, 'POST', showRequestResult);

    function showRequestResult(r) {
      if (r.result) {
        facebook_response = Ti.UI.createAlertDialog({
          title:'Compartido en Facebook!!',
          message:'La calidad del aire se ha compartido en Facebook.'
        });
      }
      else {
        facebook_response = Ti.UI.createAlertDialog({
          title:'Cancelado',
          message:'No se ha compartido la calidad del aire en Facebook.'
        });
      }
      facebook_response.show();
      var fb_resp_timeout = setTimeout(function() {
        facebook_response.hide();
      }, 2000);
    }
  }
});
