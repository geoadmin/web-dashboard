var moment = require('moment');
var config = require('../lib/Config.js');
var postData = require('../lib/ESPostData.js');
config = config.get();

//base options..
var baseOptions = {
  method: 'post',
  json: true
};

// if in config.json "insecure" is set to true, we dont want to check
// for ssl secrity.
if (config.get('insecure')) {
  baseOptions.rejectUnauthorized = false;
  baseOptions.requestCert = true;
  baseOptions.agent = false;
}

// depending on the day we need a different request url
var getURLToday = function() {
  var today = new moment().format('YYYY.MM.DD');
  return 'https://'+config.get('ES_USERNAME')+':'+config.get('ES_PASSWORD')+'@logs.bgdi.ch/elasticsearch//logstash-'+today+'/_search?search_type=count';
};

var getURLYesterday = function() {
  var yesterday = new moment().subtract(1, 'days').format('YYYY.MM.DD');
  return 'https://'+config.get('ES_USERNAME')+':'+config.get('ES_PASSWORD')+'@logs.bgdi.ch/elasticsearch//logstash-'+yesterday+'/_search?search_type=count';
};

var getQueriesURLToday = function() {
  var today = new moment().format('YYYY.MM.DD');
  return 'https://'+config.get('ES_USERNAME')+':'+config.get('ES_PASSWORD')+'@logs.bgdi.ch/elasticsearch//logstash-'+today+'/sphinxsearch/_search?search_type=count';
};

var getMapVisitsOptionsToday = function() {
  var options = baseOptions;
  options.body = postData.getMapVisitsLastHourHistogramPostData();
  options.url = getURLToday();
  return options;
};

var getMapVisitsOptionsYesterday = function() {
  var options = baseOptions;
  options.body = postData.getMapVisitsLastHourHistogramPostData();
  options.url = getURLYesterday();
  return options;
};

var getTilesFlowOptionsToday = function() {
  var options = baseOptions;
  options.body = postData.getTilesFlowLastHourHistogramPostData();
  options.url = getURLToday();
  return options;
};

var getTilesFlowOptionsYesterday = function() {
  var options = baseOptions;
  options.body = postData.getTilesFlowLastHourHistogramPostData();
  options.url = getURLToday();
  return options;
}

var getTilesPerMinuteOptions = function() {
  var options = baseOptions;
  options.body = postData.getTilesPerMinutePostData();
  options.url = getURLToday();
  return options;
};

var getTilesPerHourOptions = function() {
  var options = baseOptions;
  options.body = postData.getTilesPerHourPostData();
  options.url = getURLToday();
  return options;
};

var getQueriesPerMinuteOptions = function() {
  var options = baseOptions;
  options.body = postData.getQueriesPerMinutePostData();
  options.url = getQueriesURLToday();
  return options;
};

var getPrintQueriesPerMinuteOptions = function() {
  var options = baseOptions;
  options.body = postData.getPrintQueriesPerMinutePostData();
  options.url = getURLToday();
  return options;
};

var getTilesLastNSecondsOptions = function(n) {
  var options = getTilesPerMinuteOptions();
  var today = new moment().format('YYYY.MM.DD');
  options.url = 'https://'+config.get('ES_USERNAME')+':'+config.get('ES_PASSWORD')+'@logs.bgdi.ch/elasticsearch//logstash-'+today+'/_search?search_type=count';
  options.body = postData.getTilesPerNSecondsPostData(n);
  return options;
};

var getVisitsPerHourOptions = function() {
  var options = baseOptions;
  options.body = postData.getVisitsPerHourPostData();
  options.url = getURLToday();
  return options;
};

var getWMTSTopLayersOptions = function(layer) {
  var options = baseOptions;
  options.body = postData.getWMTSTopLayersPostData(layer);
  options.url = getURLToday();
  return options;
};

module.exports.getMapVisitsOptionsToday = getMapVisitsOptionsToday;
module.exports.getMapVisitsOptionsYesterday = getMapVisitsOptionsYesterday;
module.exports.getTilesFlowOptionsToday = getTilesFlowOptionsToday;
module.exports.getTilesFlowOptionsYesterday = getTilesFlowOptionsYesterday;
module.exports.getTilesPerMinuteOptions = getTilesPerMinuteOptions;
module.exports.getTilesPerHourOptions = getTilesPerHourOptions;
module.exports.getQueriesPerMinuteOptions = getQueriesPerMinuteOptions;
module.exports.getPrintQueriesPerMinuteOptions = getPrintQueriesPerMinuteOptions;
module.exports.getVisitsPerHourOptions = getVisitsPerHourOptions;
module.exports.getTilesLastNSecondsOptions = getTilesLastNSecondsOptions;
module.exports.getWMTSTopLayersOptions = getWMTSTopLayersOptions;
