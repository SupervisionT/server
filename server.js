var http = require('http');
var utils = require('./utils.js');
var fs = require('fs');
var isValid = require('./validation.js');

var result =  fs.readFileSync(__dirname + '/form.html',"utf8")
var prof =  fs.readFileSync(__dirname + '/profile.html',"utf8")

http.createServer(function(req,res){
  if(req.method === 'GET' && req.url === '/') {
    var rc = req.headers.cookie;
    if (rc === "name=abd"){
      res.end(prof);
    } else {
      res.end(result);
    }
    //res.end(result);
  } else if (req.method === 'POST' && req.url === '/login') {
    utils.parseBody(req,function(err,user_data){
      if (isValid(user_data)) {
        console.log("true");
        res.writeHead(302, {
          'Location': '/profile',
          'Set-Cookie': 'name=abd'
        });
      } else {
        res.writeHead(302, {
          'Location': '/'
        });
      }
      res.end();
    });
  } else if (req.method === 'GET' && req.url === '/profile') {
    var rc = req.headers.cookie;
    if (rc === "name=abd"){
      console.log("it works!!");
      res.end(prof);
    } else {
      res.writeHead(302, {
        'Location': '/'
      });
      res.end();
    }
  } else {
    res.end('Not found');
  }
}).listen(process.env.PORT || 8080,function(){
    console.log('Listening on 8080');
});
