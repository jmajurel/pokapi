var assert = require('assert');
var request = require('request');

const apiurl = "http://localhost:3000/api/pokemons";

describe('Pokemon', function() {

  describe('#index route', function() {
    it('should return list of pokemons', function(done) {
      request.get(apiurl, function(err, res, body){
        var data = JSON.parse(body);
        assert(data.length > 0, "empty data");
        done();
      });
    });
  });

  describe('#post route', function() {
    it('should save new pokemon in db', function(done){
      var pokemon = {
        name: 'Pikachu',
        picture: 'https://cdn.bulbagarden.net/upload/thumb/0/0d/025Pikachu.png/250px-025Pikachu.png',
        type: 'electric',
        ability: 'static',
        weakness: 'ground',
        height: 2,
        evolutions: 'raichu'
      }
      request.put({
        uri: 'http://localhost:3000/api/pokemons/',
        json: true,
        form: {
          name: 'Pikachu',
          picture: 'https://cdn.bulbagarden.net/upload/thumb/0/0d/025Pikachu.png/250px-025Pikachu.png',
          type: 'electric',
          ability: 'static',
          weakness: 'ground',
          height: 2,
          evolutions: 'raichu'
        }
      }, (err, res, body) => {
        if(err) {
          console.log(err)
        } else {
          assert.strictEqual(body, pokemon);
        }
        done();
      })
      .on('error', (err) => {
        console.log(err)
        done();
      })
    });
  });

});
