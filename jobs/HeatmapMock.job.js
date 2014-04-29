var y_min = 485869;
var y_max = 837076;
var x_min = 76443;
var x_max = 299941;
var features = 600;

setInterval(function() {
  hits = [];

  for (var i=0; i < 600; i++) {
    var el = {
      'wmts.input_x': Math.floor(Math.random()*(x_max - x_min) + x_min),
      'wmts.input_y': Math.floor(Math.random()*(y_max - y_min) + y_min)
    };
    hits[i] = el;
  }
  send_event('HeatmapMock', {hits: hits});
}, 3 * 1000);
