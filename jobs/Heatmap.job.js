var es = require('../lib/ElasticSearchRequests.js');

setInterval(function() {
  es.tilesNSecondsAgo(function(body) {
    send_event('Heatmap', {hits: body.hits});
  }, 1);
}, 2*1000);
