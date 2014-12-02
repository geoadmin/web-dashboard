var mostwanted = ['Cadastral webmaps', '2000W society', 'LandUse', 'Landcover','Internet'];
var mostwanted_counts = {};

setInterval(function() {
  var random_mostwanted = mostwanted[Math.floor(Math.random() * mostwanted.length)];
  var value = mostwanted_counts[random_mostwanted] && mostwanted_counts[random_mostwanted].value || 0;
  mostwanted_counts[random_mostwanted] = {
    label: random_mostwanted,
    value: (value + 1) % 30
  };
  var data = [];
  for (var i in mostwanted_counts) {
    data.push(mostwanted_counts[i]);
  }
  send_event('mostwanted', { items: data });
}, 2 * 1000);

