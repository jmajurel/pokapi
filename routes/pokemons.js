var dbverification = require('../middlewares/dbverification'),
    express        = require('express'),
    models        = require('../models')

var Pokemon = models.pokemon;
var router = express.Router();

//INDEX ROUTE
router.get('/', function(req, res){
  Pokemon.find()
    .then(pokemons => res.json(pokemons))
    .catch(err => console.log(err));
});

//CREATE ROUTE
router.post('/', dbverification.checkExistingPokemon, function(req, res){

  if(req.body.weakness && req.body.weakness.length > 0) {
    newPokemon.weakness = req.body.weakness.split(' ')
  }
  if(!req.body.evolution) req.body.evolution = "";

  Pokemon.findOne({name: req.body.evolution.toLowerCase()})
      .then(foundPokemon => {
         if(foundPokemon) {
	   newPokemon.evolution.id = foundPokemon._id
	 } else {
	   console.log(`Pokemon ${newPokemon.evolution.name} is not available in the database`);
	 }
      })
      .then(Pokemon.create({
	  name: req.body.name.toLowerCase(),
	  picture: req.body.picture,
	  type: req.body.type,
	  ability: req.body.ability,
	  height: req.body.height,
	  evolution: {
	    name: req.body.evolution
	  }
	}).catch(err => res.json(err)))
      .then((newPokemon)=> res.status(201).json(newPokemon))
      .catch(err => res.json(err));
});

//SHOW ROUTE
router.get('/:id', function(req, res){
  Pokemon.findById(req.params.id)
    .then(pokemon => res.json(pokemon))
    .catch(err => res.json(err));	
});

//UPDATE ROUTE
router.put('/:id', function(req, res){
  Pokemon.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedPokemon)=> res.json(updatedPokemon))
    .catch(err => res.json(err));	
});

//DELETE ROUTE
router.delete('/:id', function(req, res){
  Pokemon.findByIdAndRemove(req.params.id)
    .catch(err => res.json(err));	
});


module.exports = router;
