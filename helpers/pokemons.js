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
    picture: req.body.picture
  };

  if(!req.body.ability) {
    req.body.ability = "";
  }
  newPokemon.ability = req.body.ability.split(' ');

  if(!req.body.weakness) {
    req.body.weakness = "";
  }
  newPokemon.weakness = req.body.weakness.split(' ');

  if(!req.body.evolutions) {
    req.body.evolutions ="";
  }

  Pokemon.find({name: {$in: req.body.evolutions.split(' ')}})
  .then(function(foundPokemons) {
    newPokemon.evolutions = foundPokemons.reduce((acc, item) => {
      acc.push({id: item._id, name: item.name});
      return acc;
    }, []);
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

  var updatedPokemon = {
    name: req.body.name,
    type: req.body.type,
    height: req.body.height,
    picture: req.body.picture
  };

  if(!req.body.ability) {
    req.body.ability = "";
  }
  updatedPokemon.ability = req.body.ability.split(' ');

  if(!req.body.weakness) {
    req.body.weakness = "";
  }
  updatedPokemon.weakness = req.body.weakness.split(' ');

  if(!req.body.evolutions) {
    req.body.evolutions ="";
  }

  Pokemon.find({name: {$in: req.body.evolutions.split(' ')}})
  .then(function(foundPokemons) {
    updatedPokemon.evolutions = foundPokemons.reduce((acc, item) => {
      acc.push({id: item._id, name: item.name});
      return acc;
    }, []);
  })
  .then(function() {
     Pokemon.findByIdAndUpdate(req.params.id, updatedPokemon, {new: true})
    .then(updatedPokemon=> res.status(201).json(updatedPokemon))
    .catch(err => res.send(err));
  })
  .catch(err => res.send(err));
};

exports.deletePokemon = function (req, res){
  Pokemon.findByIdAndRemove(req.params.id)
    .then(() => res.json({message: "Pokemon removed"}))
    .catch(err => res.send(err));	
}

module.exports = exports;
