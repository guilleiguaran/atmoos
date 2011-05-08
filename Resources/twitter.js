Ti.include('lib/sha1.js');
Ti.include('lib/oauth.js');
Ti.include('lib/oauth_adapter.js');
Ti.include('lib/twitter_api.js');

app.twitterButton.addEventListener('click', function(){
  if (oa.oAuthAdapter.isAuthorized() != false) {
	  oa.oAuthAdapter.send({
		  url:'https://api.twitter.com/1/statuses/update.json', 
		  parameters:[
        ['status','La calidad del aire cerca de [lugar] es [calidad]']
		  ],
		  method:'POST',
		  onSuccess:function(response){
		    twitter_response = Ti.UI.createAlertDialog({
          title:'Publicado',
          message:'Se ha compartido la calidad del aire en Twitter.'
        });
        twitter_response.show();
      }
		});
  }
});

