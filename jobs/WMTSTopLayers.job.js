var ESRequest = require('../lib/ElasticSearchRequests.js');
var max_tacho = 1000;
var layer_list = ["ch.swisstopo.pixelkarte-farbe", "ch.swisstopo.swissimage", "ch.swisstopo.swisstlm3d-wanderwege", "ch.swisstopo.swisstlm3d-karte-farbe", "ch.swisstopo.swissboundaries3d-kanton-flaeche.fill", "ch.swisstopo.swissboundaries3d-land-flaeche.fill", "ch.swisstopo.swissboundaries3d-gemeinde-flaeche.fill", "ch.swisstopo.pixelkarte-grau", "ch.swisstopo.zeitreihen", "ch.swisstopo.pixelkarte-farbe-pk25.noscale"];
var layer_list_trad = ["National map color", "Aerial image", "Hiking Trails", "SwissTLM map", "Kanton boundaries", "National boundaries", "Communal boundaries", "Natial map grey", "Journey through time", "1:25K national map"];

var sendEvent = function() {
  var layer = "ch.swisstopo.pixelkarte-farbe";
  var data = [];
  var hit = {};

  for (id in layer_list) {
    //window.console.log(id);
    //asyncProcess(id, function(cntr) {
      // Request the total amount of tiles for the specified layer
      //ESRequest.WMTSTopLayers( function(count) {
      // var hits = Math.floor(count);
      //  if (hits > max_tacho) {
      //    max_tacho = hits;
      //  }
      //}, layer_list[id]);
     // return hits, max_tacho;
    //});
    hit[id] = {
      // value: hits,
      label: layer_list_trad[id],
      max: max_tacho
    }
    data.push(hit[id]);
    if (data.length == layer_list.length){
      send_event('wmts_top_layers', { items: data });
    }
  }
};
// Send this event every 5 seconds
setInterval(function() {sendEvent();}, 5000);
