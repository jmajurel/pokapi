var models = require('../models');
var middlewarePackage = {}

var Pokemon = models.pokemon;
var Character = models.character;

middlewarePackage.checkExistingPokemon = function (req, res, next){
  Pokemon.findOne({name: req.body.name}, function(err, data){
    if(err){
      res.send(err);
    } else {
      if(!data){
        next(); 
      } else {
        res.status(409).send({message: "Pokemon already existing in db"});
      }
    }
  }); 
}

middlewarePackage.checkExistingCharacter = function (req, res, next){
  Character.findOne({name: req.body.name}, function(err, data){
    if(err){
      res.send(err);
    } else {
      if(!data){
        next();
      } else {
        res.status(409).send({message: "Character already existing in db"});
      }
    }
  }); 
}

module.exports =  middlewarePackage; 
