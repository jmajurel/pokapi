var express    = require('express'),
   bodyParser  = require('body-parser'),
   pokemonsRouter = require('./routes/pokemons'),
   app         = express();

const PORT = process.env.PORT || '3000';

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use('/api/pokemons', pokemonsRouter);

app.listen(PORT, function(){
  console.log("server running on port " + PORT);
});

