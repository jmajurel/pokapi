var mongoose = require('mongoose');

var pokemonSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  picture: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    lowercase: true
  },
  ability: String,
  weakness: [String],
  height: Number,
  evolution: {
    id : {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Pokemon'
    },
    name: {
      type: String,
      lowercase: true
    }
  }
});

module.exports = mongoose.model('Pokemon', pokemonSchema);
