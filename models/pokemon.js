var mongoose = require('mongoose');

var pokemonSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  ability: String,
  weakness: [String],
  height: Number,
  evolution: {
    id : {type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon'},
    name: String
  }
});

module.exports = mongoose.model('Pokemon', pokemonSchema);
