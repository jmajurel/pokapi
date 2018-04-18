var dbverification = require('../../middlewares/dbverification'),
    express        = require('express'),
    models        = require('../../models/api'),
    helpers        = require('../../helpers/characters.js');


var Character = models.character;
var Pokemon   = models.pokemon;

var router = express.Router();

router.route('/')
  .get(helpers.getCharacters)     //INDEX
  .post(dbverification.checkExistingCharacter,
  helpers.createCharacter); //CREATE

router.route('/:id')
  .get(helpers.showCharacter)    //SHOW
  .put(helpers.updateCharacter)    //UPDATE
  .delete(helpers.deleteCharacter) //DESTROY

module.exports = router;
