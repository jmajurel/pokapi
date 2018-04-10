var mongoose = require('mongoose');

var pokemonSchema = mongoose.Schema({
  name: String,
  type: String,
  age: Number
});

module.exports = mongoose.model('pokemon', pokemonSchema);
