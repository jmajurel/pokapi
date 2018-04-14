var dbverification = require('../middlewares/dbverification'),
    express        = require('express'),
    models         = require('../models'),
    helpers        = require('../helpers/pokemons.js');

var Pokemon = models.pokemon;
var router = express.Router();

router.route('/')
  .get(helpers.getPokemons) //INDEX 
  .post(helpers.createPokemon) //CREATE 

router.route('/:id')
  .get(helpers.showPokemon) //SHOW
  .put(helpers.updatePokemon) //UPDATE
  .delete(helpers.deletePokemon) //DESTROY

module.exports = router;
