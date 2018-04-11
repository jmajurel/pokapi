
var Pokemon = require('../models/pokemon');

function checkExistingEntry(req, res, next){
  Pokemon.findOne({name: req.body.name.toLowerCase()}, function(err, data){
    if(err){
      console.log(err);
    } else {
      !data ? next() : console.log("Pokemon already existing in db");
    }
  }); 
}

module.exports = checkExistingEntry;
