var express = require('express');
var request = require('request');

var router = express.Router();

router.get('/', function(req, res){
  request.get('http://localhost:3000/api/pokemons/')
    .on('response', function(response){
      if(response.statusCode !== 200){
	console.log("wrong statusCode!");
      } else {
	response.on('data', function(data){
	  var pokemons = JSON.parse(data);
	  console.log(pokemons);
          res.render('index', {pokemon: pokemons[2]});
	});
      }
    })
    .on('error', function(error){
      console.log(err);
    })
});

module.exports = router;
