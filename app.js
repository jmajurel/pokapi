var express    = require('express'),
   mongoose    = require('mongoose'),
   bodyParser  = require('body-parser'),
   Pokemon     = require('./models/pokemon'),
   dbverification = require('./middlewares/dbverification'),
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


app.post('/api/pokemons', dbverification.checkExistingEntry, function(req, res){

  var newPokemon = {
    name: req.body.name.toLowerCase(),
    picture: req.body.picture,
    type: req.body.type,
    ability: req.body.ability,
    weakness: req.body.weakness.split(' '),
    height: req.body.height,
    evolution: {
      name: req.body.evolution
    }
  };

  Pokemon.findOne({name: req.body.evolution.toLowerCase()}, function(err, foundPokemon){
    if(err){
      console.log(err);
    } else {
      if(foundPokemon) {
        newPokemon.evolution.id = foundPokemon._id
      } else {
        console.log(`Pokemon ${newPokemon.evolution.name} is not available in the database`);
      }
      Pokemon.create(newPokemon, function(err){
	if(err){
	  console.log(err);
	}
      });
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

