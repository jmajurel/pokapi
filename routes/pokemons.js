var dbverification = require('../middlewares/dbverification'),
    express        = require('express'),
    Pokemon        = require('../models')

 var router = express.Router();

//INDEX ROUTE
router.get('/', function(req, res){
  Pokemon.find()
    .then(pokemons => res.json(pokemons))
    .catch(err => console.log(err));
});

//CREATE ROUTE
router.post('/', dbverification.checkExistingEntry, function(req, res){

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

  Pokemon.findOne({name: req.body.evolution.toLowerCase()})
      .then(foundPokemon => {
         if(foundPokemon) {
	   newPokemon.evolution.id = foundPokemon._id
	 } else {
	   console.log(`Pokemon ${newPokemon.evolution.name} is not available in the database`);
	 }
      })
      .then(Pokemon.create(newPokemon)
	.catch(err => console.log(err))
      )
      .catch(err => console.log(err));
});

//SHOW ROUTE
router.get('/:id', function(req, res){
  Pokemon.findById(req.params.id)
    .then(pokemon => res.json(pokemon))
    .catch(err => console.log(err));	
});

//UPDATE ROUTE
router.put('/:id', function(req, res){
  Pokemon.findByIdAndUpdate(req.params.id, req.body)
    .catch(err => console.log(err));	
});

//DELETE ROUTE
router.delete('/:id', function(req, res){
  Pokemon.findByIdAndRemove(req.params.id)
    .catch(err => console.log(err));	
});


module.exports = router;
