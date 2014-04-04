var request = require('request');
var esoptions = require('./lib/ESRequestOptions.js');
var moment = require('moment');
var requester = require('./lib/ElasticSearchRequests.js');
/**
var start = moment.utc().subtract('minutes', 30).format();
var end = moment.utc().format();

var postData = {
"query": {
  "filtered": {
    "query": {
      "query_string": {
         "query" : "*build.js"
       }
     },
     "filter": {
       "range": {
         "@timestamp": {
            "from":start,
            "to":end
          },
          "@fields.gis.zoomlevel": {
            "from": 22,
            "to": 28
          }
        }
      }
    }
  },
  "facets" : {
    "locations" : {
      "terms" : {
        "field" : "@fields.gis.wgs84_latlng",
        "size": 1000
      }
    }
  }
};
**/
requester.tilesNSecondsAgo(function(data){
  console.log(data.hits);
}, 3);

/**
options = esoptions.getTilesLastNSecondsOptions(3);
//options = esoptions.getMapVisitsOptionsToday();
options.url = 'https://lttro:voo3Peaxai@logs.bgdi.ch/elasticsearch//logstash-'+moment().format('YYYY.MM.DD')+'/_search';

request(options, function(err, res, body) {
  console.log(err);
  console.log(res);
  console.log(body.hits.hits);
  body.hits.hits.map(function(a){
    console.log(a['wmts.input_x']);
  });
});


map.getMapVisits(function(data) {
    console.log(data);
});

requester.tilesPerMinute(function(data) {
  console.log(data);
});**/
