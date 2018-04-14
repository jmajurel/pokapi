var assert = require('assert');
var request = require('request');

const apiurl = "http://localhost:3000/api/pokemons/";

describe('Pokemons', function() {
  describe('#index route', function() {
    it('should return a list of pokemon', function(){
      request(apiurl, function(err, res, body){
        assert(body.length > 0, "returned empty list");
      });
    });
  });
});

