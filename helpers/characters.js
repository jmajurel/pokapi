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
        .catch(err => res.send(err));
  })

  Character.create(newCharacter)
  .then(newCharacter => res.status(201).json(newCharacter))
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
