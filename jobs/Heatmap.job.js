var es = require('../lib/ElasticSearchRequests.js');

setInterval(function() {
  es.tilesNSecondsAgo(function(body) {
    send_event('Heatmap', {hits: body.hits});
  }, 10);

}, 3 * 1000);
