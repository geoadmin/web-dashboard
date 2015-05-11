var ESRequest = require('../lib/ElasticSearchRequests.js');
//This defines the initial maximal value
var max_tacho = 50000;


var sendEvent = function() {
  ESRequest.tilesPerMinute(function(count) {
    var hits = Math.floor(count);
    if (hits > max_tacho) {
      max_tacho = hits;
    }
    send_event('tiles_per_minute', {value: hits, max: max_tacho});
  });
};

// send this event every second
setInterval(function() {
  sendEvent();
}, 1000);
