var ESRequest = require('../lib/ElasticSearchRequests.js');
var max_tacho = 500;


var sendEvent = function() {
  ESRequest.tilesPerMinute(function(count) {
    var hits = Math.floor(count / 60);
    if (hits > max_tacho) {
      max_tacho = hits;
    }
    send_event('tiles_per_second', {value: hits, max: max_tacho});
  });
};

setInterval(function() {sendEvent();}, 2 * 1000);
