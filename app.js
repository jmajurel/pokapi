var express = require('express'),
   mongoose = require('mongoose'),
   bodyParser = require('body-parser'),
   Pokemon     = require('./pokemon.js'),
   app = express();

app.use(bodyParser.urlencoded({ extended: false}));

mongoose.connect('mongodb://localhost/pokapi');

app.get('/', function(req, res){
  res.redirect('/api/pokemons');
});

app.get('/api/pokemons', function(req, res){
  Pokemon.find({}, function(err, pokemons){
    if(err){
      console.log(err);
    } else {
      res.json(pokemons);
    }
  });
});

app.post('/api/pokemons', function(req, res){
  var newPokemon = new Pokemon(req.body.pokemon);
  newPokemon.save(function(err){
    if(err){
      console.log(err);
    }
  });
});

app.get('/api/pokemons/:id', function(req, res){
  Pokemon.findById(req.params.id, function(err, pokemon){
    if(err){
      console.log(err);
    } else {
      res.json(pokemon);
    }
  }); 
});

app.put('/api/pokemons/:id', function(req, res){
  Pokemon.findByIdAndUpdate(req.params.id, req.body.pokemon, function(err){
    if(err){
      console.log(err);
    }
  });
});

app.delete('/api/pokemons/:id', function(req, res){

});

app.listen('3000', function(){
  console.log("server running on port 9000");
});

