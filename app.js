var express = require('express'),
   mongoose = require('mongoose'),
   app = express();

mongoose.connect('mongodb://localhost/todos_api');

app.get('/', function(req, res){
  res.send("<h1>Hello World!</h1>");
});


app.listen('9000', function(){
  console.log("server running on port 9000");
});

