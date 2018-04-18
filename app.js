var express    = require('express'),
   bodyParser  = require('body-parser'),
   pokemonsRouter = require('./routes/api/pokemons'),
   charactersRouter = require('./routes/api/characters'),
   clientAppRouter  = require('./routes/clientapp/index'),
   app         = express();

const PORT = process.env.PORT || '3000';

app.set('view engine', 'pug');

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/api/pokemons', pokemonsRouter);
app.use('/api/characters', charactersRouter);
app.use('/', clientAppRouter);

app.listen(PORT);

