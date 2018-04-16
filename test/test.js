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
      })
      .on('error', function(err){
        done(err);
      })
    });
  });

  describe('#create route', function() {
    it('should save new pokemon in db', function(done){
      var pokemon = {
        name: 'pikachu3',
        picture: 'https://cdn.bulbagarden.net/upload/thumb/0/0d/025Pikachu.png/250px-025Pikachu.png',
        type: 'electric',
        ability: 'static',
        weakness: 'ground',
        height: 2,
        evolutions: 'raichu'
      }
      request.post({
        uri: apirul,
        json: true,
        form: pokemon 
        }, function(err, res, body){
        if(err) {
          console.log(err)
          done(err);
        } else {
          assert.strictEqual(body.name, pokemon.name);
          done();
        }
      })
      .on('error', function(err){
        console.log(err)
        done(err);
      })
    });
  });

  describe('#destroy route', function(){

  });
});
