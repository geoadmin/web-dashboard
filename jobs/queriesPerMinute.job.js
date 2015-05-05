var ESRequest = require('../lib/ElasticSearchRequests.js');
var max_tacho = 1000;


var sendEvent = function() {
  ESRequest.queriesPerMinute(function(count) {
    var hits = Math.floor(count);
    if (hits > max_tacho) {
      max_tacho = hits;
    }
    send_event('queries_per_minute', {value: hits, max: max_tacho});
  });
};

// Send this event every second
setInterval(function() {sendEvent();}, 1000);
