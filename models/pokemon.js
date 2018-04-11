var mongoose = require('mongoose');

var pokemonSchema = mongoose.Schema({
  name: String,
  picture: String,
  type: String,
  ability: String,
  weakness: [String],
  height: Number,
  evolution: {type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon'}
});

module.exports = mongoose.model('Pokemon', pokemonSchema);
