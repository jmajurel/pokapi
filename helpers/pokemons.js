var models = require('../models');

var Character = models.character;
var Pokemon   = models.pokemon;


exports.getPokemons = function(req, res){
  Pokemon.find()
    .then(pokemons => res.json(pokemons))
    .catch(err => res.send(err));
};

exports.createPokemon = function(req, res){
  var newPokemon = {
    name: req.body.name,
    type: req.body.type,
    height: req.body.height,
    picture: req.body.picture,
    ability: req.body.ability,
    weakness: req.body.weakness,
    evolution: {
      name: req.body.evolution,
    }
  };
  Pokemon.findOne({name: req.body.evolution})
  .then(function(foundPokemon) {
    if(foundPokemon) {
      newPokemon.evolution.id = foundPokemon._id;
    } else {
      console.log(`Pokemon evolution: ${req.body.evolution} is not in db`);
    }
  })
  .then(function() {
     Pokemon.create(newPokemon)
    .then(newPokemon => res.status(201).json(newPokemon))
    .catch(err => res.send(err));
  })
  .catch(err => res.send(err));
};

exports.showPokemon = function (req, res){
  Pokemon.findById(req.params.id)
    .then(pokemon => res.json(pokemon))
    .catch(err => res.send(err));	
};

exports.updatePokemon = function (req, res){
  Pokemon.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(updatedPokemon => res.json(updatedPokemon))
    .catch(err => res.send(err));	
};

exports.deletePokemon = function (req, res){
  Pokemon.findByIdAndRemove(req.params.id)
    .then(() => res.json({message: "Pokemon removed"}))
    .catch(err => res.send(err));	
}

module.exports = exports;
