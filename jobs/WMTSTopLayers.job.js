var ESRequest = require('../lib/ElasticSearchRequests.js');
var max_tacho = 1000;


var sendEvent = function() {
  ESRequest.WMTSTopLayers(function(count) {
    var hits = Math.floor(count);
    if (hits > max_tacho) {
      max_tacho = hits;
    }
    var data = [];
    var hit = {}; 
    hit.value = hits;
    hit.label = 'National Map';
    hit.max = max_tacho;
    data.push(hit);

    send_event('wmts_top_layers', { items: data });
  });
};

// Send this event every 5 minutes
setInterval(function() {sendEvent();}, 5000);
