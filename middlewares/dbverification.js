var models = require('../models');
var middlewarePackage = {}

var Pokemon = models.pokemon;
var Character = models.character;

middlewarePackage.checkExistingPokemon = function (req, res, next){
  Pokemon.findOne({name: req.body.name.toLowerCase()}, function(err, data){
    if(err){
      res.json(err);
    } else {
      !data ? next() : console.log("Pokemon already existing in db");
      res.status(409).end()
    }
  }); 
}

middlewarePackage.checkExistingCharacter = function (req, res, next){
  Character.findOne({name: req.body.name.toLowerCase()}, function(err, data){
    if(err){
      res.json(err);
    } else {
      !data ? next() : console.log("Character already existing in db");
      res.status(409).end()
    }
  }); 
}

module.exports =  middlewarePackage; 
