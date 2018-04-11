var express    = require('express'),
   mongoose    = require('mongoose'),
   bodyParser  = require('body-parser'),
   Pokemon     = require('./models/pokemon.js'),
   app         = express();

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

function checkExistingEntry(req, res, next){
  Pokemon.findOne({name: req.body.name}, function(err, data){
    if(!data){
      next(); 
    };
  }); 
}

app.post('/api/pokemons', checkExistingEntry, function(req, res){

  var newPokemon = {
    name: req.body.name,
    picture: req.body.picture,
    type: req.body.type,
    ability: req.body.ability,
    weakness: req.body.weakness.split(' '),
    height: req.body.height
  };

  Pokemon.findOne({name: req.body.evolution}, function(err, foundPokemon){
    if(err){
      console.log(err);
    } else if(foundPokemon){
      newPokemon.evolution = foundPokemon.id;
    } else {
      Pokemon.create(newPokemon, function(err){
	if(err){
	  console.log(err);
	}
      });
      if(req.body.evolution) console.log(`Pokemon ${req.body.evolution} is not available in the database`);
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
  Pokemon.findByIdAndUpdate(req.params.id, req.body, function(err){
    if(err){
      console.log(err);
    }
  });
});

app.delete('/api/pokemons/:id', function(req, res){
  Pokemon.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err);
    }
  });
});

app.listen('3000', function(){
  console.log("server running on port 3000");
});

