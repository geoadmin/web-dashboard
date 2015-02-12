var moment = require('moment');
var request = require('request');
var requestOptions = require('../lib/ESRequestOptions.js');
var config = require('../lib/Config.js').get();
var _ = require('underscore');
/**
 * the request is wrapped. If we don't get a valid response we
 * log it but don't call the callback.
 *
 * @param {Array} options The request options.
 * @param {Function} callback
 **/
var doRequest = function(options, callback) {
  request(options, function(err, res, body) {
    if (err) {
      console.log(err, 'error while getting data from elastic search.');
      return;
    }
    if (res.statusCode != 200 && res.statusCode != 304) {
      console.log('Could not fetch data.');
      console.log(res.statusCode);
      console.log(body);
      return;
    }
//    entries = body.facets['0'].entries;
    callback(body);
  });
};

/**
 * we fetch all data from today and yesterday combine it and give it to
 * the callback function. The data contains a array with a timestamp and
 * a count of how man times maps.geo.admin.ch has been visited within
 * the previous 30 min.
 *
 * @param {Function} callback
 **/
var getMapVisitsHistogram = function(callback) {
  var todayData = false;
  var yesterdayData = false;
  var waitForAllData = function() {
    if (todayData != false && yesterdayData != false) {
      callback(_.union(todayData, yesterdayData));
    }
  };

  doRequest(requestOptions.getMapVisitsOptionsToday(), function(data) {
    todayData = data.facets['0'].entries;
    waitForAllData();
  });

  doRequest(requestOptions.getMapVisitsOptionsYesterday(), function(data) {
    yesterdayData = data.facets['0'].entries;
    waitForAllData();
  });
};

/**
 * The callback function receives the amount of tiles that are served
 * by all the wmts services within the last minute.
 *
 * @param {Function} callback
 **/
var tilesPerMinute = function(callback) {
  doRequest(requestOptions.getTilesPerMinuteOptions(), function(data) {
    callback(data.hits.total);
  });
};

/**
 * The callback function receives the amount of tiles that are served
 * by all the wmts services within the last minute.
 *
 * @param {Function} callback
 **/

var queriesPerMinute = function(callback) {
    doRequest(requestOptions.getQueriesPerMinuteOptions(), function(data) {
          callback(data.hits.total);
            });
};

/**
 * The callback function receives the amount of visitors map.geo.admin.ch
 * had within the last hour.
 *
 * @param {Function} callback
 **/
var visitsPerHour = function(callback) {
  doRequest(requestOptions.getVisitsPerHourOptions(), function(data) {
    callback(data.hits.total);
  });
};

var lastSeconds = 0.1;
var tilesNSecondsAgo = function(callback, lastSeconds){
  options = requestOptions.getTilesLastNSecondsOptions(lastSeconds);
  options.url = 'https://'+config.get('ES_USERNAME')+':'+config.get('ES_PASSWORD')+'@logs.bgdi.ch/elasticsearch//logstash-'+moment().format('YYYY.MM.DD')+'/_search';
  doRequest(options, function(data) {
    callback(data.hits);
  });
}

module.exports.getMapVisitsHistogram = getMapVisitsHistogram;
module.exports.tilesPerMinute = tilesPerMinute;
module.exports.queriesPerMinute = queriesPerMinute;
module.exports.visitsPerHour = visitsPerHour;
module.exports.tilesNSecondsAgo = tilesNSecondsAgo;
