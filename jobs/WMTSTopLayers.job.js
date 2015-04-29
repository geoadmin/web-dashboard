var ESRequest = require('../lib/ElasticSearchRequests.js');
var max_tacho = 1000;


var sendEvent = function() {
  ESRequest.WMTSTopLayers(function(count) {
    var hits = Math.floor(count);
    if (hits > max_tacho) {
      max_tacho = hits;
    }
    send_event('wmts_top_layers', {value: hits, max: max_tacho});
  });
};

setInterval(function() {sendEvent();}, 10 * 60 * 1000);
