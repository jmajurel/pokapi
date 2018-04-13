var express    = require('express'),
   bodyParser  = require('body-parser'),
   pokemonsRouter = require('./routes/pokemons'),
   charactersRouter = require('./routes/characters'),
   app         = express();

const PORT = process.env.PORT || '3000';

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/api/pokemons', pokemonsRouter);
app.use('/api/characters', pokemonsRouter);

app.get(/(api)?/, (req, res) => res.redirect('api/pokemons/'));

app.listen(PORT);

