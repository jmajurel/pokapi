var models = require('../models');

var Character = models.character;
var Pokemon   = models.pokemon;


exports.getPokemons = function(req, res){
  Pokemon.find()
    .then(pokemons => res.json(pokemons))
    .catch(err => res.send(err));
};

exports.createPokemon = function(req, res){

  Pokemon.findOne({name: req.body.evolution})
  .then(foundPokemon => req.body.evolution.id = foundPokemon._id)
  .then(() => Pokemon.create(req.body))
  .then(newPokemon => res.status(201).json(newPokemon))
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
