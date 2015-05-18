var ESRequest = require('../lib/ElasticSearchRequests.js');
var max_tacho = 50;


var sendEvent = function() {
  ESRequest.printQueriesPerMinute(function(count) {
    var hits = Math.floor(count);
    if (hits > max_tacho) {
      max_tacho = hits;
    }
    send_event('print_queries_per_minute', {value: hits, max: max_tacho});
  });
};

// Send this event every second
setInterval(function() {sendEvent();}, 1000);
