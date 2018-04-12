var mongoose = require('mongoose');
var Pokemon = require('./pokemon');

mongoose.Promise = Promise;

const dbUrl = process.env.POKAPI_DATABASEURL || 'mongodb://localhost/pokapidb';
mongoose.connect(dbUrl);

module.exports = Pokemon;
