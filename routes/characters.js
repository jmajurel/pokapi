var dbverification = require('../middlewares/dbverification'),
    express        = require('express'),
    models        = require('../models')

var Character = models.character;
var Pokemon   = models.pokemon;

var router = express.Router();

//INDEX ROUTE
router.get('/', function(req, res){
  Character.find()
    .then(character => res.json(character))
    .catch(err => console.log(err));
});

//CREATE ROUTE
router.post('/', dbverification.checkExistingCharacter, function(req, res){

  var newCharacter = {
    name: req.body.name.toLowerCase(),
    gender: req.body.gender.toLowerCase(),
    age: req.body.age
  };

  req.body.ownPokemons
    .split(" ")
    .forEach(function(pokemon){
      Pokemon.findOne({name: pokemon})
	.then(foundPokemon => {
	  if(foundPokemon) {
	    newCharacter.ownPokemons.push(foundPokemon._id);
	  } else {
	    console.log(`Pokemon ${newPokemon.evolution.name} is not available in the database`);
	  }
	})
        .catch(err => console.log(err));
  });
});

//SHOW ROUTE
router.get('/:id', function(req, res){
  Character.findById(req.params.id)
    .then(character => res.json(character))
    .catch(err => console.log(err));	
});

//UPDATE ROUTE
router.put('/:id', function(req, res){
  Character.findByIdAndUpdate(req.params.id, req.body)
    .catch(err => console.log(err));	
});

//DELETE ROUTE
router.delete('/:id', function(req, res){
  Character.findByIdAndRemove(req.params.id)
    .catch(err => console.log(err));	
});

module.exports = router;
