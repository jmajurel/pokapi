var mongoose = require('mongoose');

function checkGender(gender){
  return gender === "male" || gender === "female" 
}

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
    validator: [checkGender, "character gender is neither Male nor Female"]
  },
  age: Number,
  ownPokemons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon'}]
});

module.exports = mongoose.model('Character', characterSchema);
