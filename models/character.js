var mongoose = require('mongoose');

function checkGender(gender){
  return gender === "male" || gender === "female" 
}

var checkGenderValidator = [checkGender, "character gender is neither Male nor Female"];

var characterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  gender: {
    type: String,
    required: true,
    lowercase: true,
    validator: checkGenderValidator 
  },
  age: Number,
  ownPokemons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon'}]
});

module.exports = mongoose.model('Character', characterSchema);
