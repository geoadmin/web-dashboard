var map = require('./lib/MapGeoVisitors.js');

map.getMapVisits(function(data){
    console.log(data);
});

map.tilesPerMinute(function(data){
  console.log(data);
});
