var mongoose = require('mongoose');

var pokemonSchema = mongoose.Schema({
  name: String,
  picture: String,
  type: String,
  ability: String,
  weakness: [String],
  height: Number,
  evolution: {
    id : {type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon'},
    name: String
  }
});

module.exports = mongoose.model('Pokemon', pokemonSchema);
