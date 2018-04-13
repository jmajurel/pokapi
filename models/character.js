var mongoose = require('mongoose');

function checkGender(gender){
  return gender.tolowercase() === "male" || gender.tolowercase() === "female" 
}

var checkGenderValidator = [checkGender, "character gender is neither Male nor Female"];

var characterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    validator: checkGenderValidator 
  },
  age: Number,
  ownPokemons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon'}]
});

module.exports = mongoose.model('Character', characterSchema);
