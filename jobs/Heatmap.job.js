var es = require('../lib/ElasticSearchRequests.js');

var sendEvent = function() {
  es.tilesNSecondsAgo(function(body) {
    send_event('Heatmap', {hits: body.hits});
  }, 1);
};

sendEvent();

// send this event every 2 seconds
setInterval(function() {
    sendEvent();
}, 2000);
