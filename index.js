var express = require('express');
var app=express();
var http =require('http');

app.set('port', (process.env.PORT || 5000));

app.get('/*', onGetRequest);
app.post('/*', onPostRequest);


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

/**
* GET request handler
*/
function onGetRequest(req,res){
	onRequest(req,res,"GET");
}

/**
* POST request handler
*/
function onPostRequest(req,res){
	onRequest(req,res,"POST");
}

/**
*Request handler
*/
function onRequest(client_req, client_res,type) {
  console.log('serve: ' + client_req.url);

  var options = {
    hostname: 'www.google.com.ua',
    port: 80,
    path: client_req.url,
    method: type
  };

  var proxy = http.request(options, function (res) {
    console.log(res.headers);
    console.log(res.statusCode);
    console.log(res.statusMessages);

    if(res.statusCode==302)
    	res.statusCode=200;

    res.pipe(client_res, {
      end: true
    });
  });

  client_req.pipe(proxy, {
    end: true
  });
}
