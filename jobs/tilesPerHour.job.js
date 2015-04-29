var ESRequest = require('../lib/ElasticSearchRequests.js');
var max_tacho = 1000;

var sendEvent = function() {
  ESRequest.tilesPerHour(function(count) {
    var hits = Math.floor(count / 3600);
    if (hits > max_tacho) {
      max_tacho = hits;
    }
    send_event('tiles_per_hour', {value: hits, max: max_tacho});
  });
};

setInterval(function() {sendEvent();}, 10 * 60 * 1000);
