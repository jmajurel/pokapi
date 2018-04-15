var models = require('../models');

var Character = models.character;
var Pokemon   = models.pokemon;

exports.getCharacters = function (req, res){
  Character.find()
    .then(character => res.json(character))
    .catch(err => res.send(err));
};

exports.createCharacter = function (req, res){

  var newCharacter = {
    name: req.body.name,
    gender: req.body.gender,
    age: req.body.age
  };

  if(req.body.ownPokemons){
    req.body.ownPokemons = "";
  }

  Pokemon.find({name: {$in: req.body.ownPokemons.split(' ')}})
  .then(function(foundPokemons){
    newCharacter.ownPokemons = foundPokemons;
  })
  .then(function(){
    Character.create(newCharacter, {new: true})
    .then(newCharacter => res.status(201).json(newCharacter))
    .catch(err => res.send(err));
  })
  .catch(err => res.send(err));
};

exports.showCharacter = function (req, res){
  Character.findById(req.params.id)
    .then(character => res.json(character))
    .catch(err => res.send(err));	
};

exports.updateCharacter = function (req, res){
  Character.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(updatedCharacter => res.json(updatedCharacter))
    .catch(err => res.send(err));	
};

exports.deleteCharacter = function (req, res){
  Character.findByIdAndRemove(req.params.id)
    .then(() => res.json({message: "Character removed"}))
    .catch(err => res.send(err));	
};
module.exports = exports;
