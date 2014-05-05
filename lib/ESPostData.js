var moment = require('moment');
var conf = require('./Config.js').get();

var get30minHistogramPostData = function() {
  return {"facets":{"0":{"date_histogram":{"field":"@timestamp","interval":"30m"},"global":true,"facet_filter":{"fquery":{"query":{"filtered":{"query":{"query_string":{"query":"*build.js"}},"filter":{"bool":{"must":[{"range":{"@timestamp":{"from":moment().subtract('days', 1),"to":"now"}}}],"must_not":[{"fquery":{"query":{"query_string":{"query":"ua.name:(\"GoogleBot\" or \"YandexBot\" or \"BingBot\" or \"PhantomJS\")"}},"_cache":true}}]}}}}}}}},"size":0};
};

var getTilesPerMinutePostData = function() {
//  return {"filter":{"fquery":{"query":{"filtered":{"query":{"query_string":{"query":"wmts"}},"filter":{"bool":{"must":[{"range":{"@timestamp":{"from":moment().subtract('seconds', 60),"to":"now"}}}]}}}}}},"size":0};
  return {"filter":{"fquery":{"query":{"filtered":{"query":{"query_string":{"query":"*"}},"filter":{"bool":{"must":[{"range":{"@timestamp":{"from":moment().subtract('seconds', 60),"to":moment()}}},{"fquery":{"query":{"query_string":{"query":"tags:((\"s3-tiles\" AND \"wmts\"))"}},"_cache":true}}]}}}}}},"size":0};
};

var getVisitsPerHourPostData = function() {
  return {"filter":{"fquery":{"query":{"filtered":{"query":{"query_string":{"query":"*build.js"}},"filter":{"bool":{"must":[{"range":{"@timestamp":{"from":new moment().subtract('minutes', 60),"to":"now"}}}],"must_not":[{"fquery":{"query":{"query_string":{"query":"ua.name:(\"GoogleBot\" or \"YandexBot\" or \"BingBot\" or \"PhantomJS\")"}},"_cache":true}}]}}}}}},"size":0};
};

var heatmap_delay = conf.get("heatmap_delay");
var getTilesPerNSecondsPostData = function(n) {
  return {"filter":{"fquery":{"query":{"filtered":{"query":{"query_string":{"query":"*"}},"filter":{"bool":{"must":[{"range":{"@timestamp":{"from":moment().subtract('seconds', n+heatmap_delay),"to":moment().subtract('seconds', heatmap_delay)}}},{"fquery":{"query":{"query_string":{"query":"tags:((\"s3-tiles\" AND \"wmts\"))"}},"_cache":true}}]}}}}}}, 'size': conf.get("heatmap_tiles_limit")};
}

module.exports.get30minHistogramPostData = get30minHistogramPostData;
module.exports.getTilesPerMinutePostData = getTilesPerMinutePostData;
module.exports.getVisitsPerHourPostData = getVisitsPerHourPostData;
module.exports.getTilesPerNSecondsPostData = getTilesPerNSecondsPostData;
