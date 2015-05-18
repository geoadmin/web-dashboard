var moment = require('moment');
var conf = require('./Config.js').get();

var getMapVisitsLastHourHistogramPostData = function() {
  return {
    "facets":{
      "0":{
        "date_histogram":{
          "field":"@timestamp","interval":"1h"
        },"global":true,"facet_filter":{
          "fquery":{
            "query":{
              "filtered":{
                "query":{
                  "query_string":{
                    "query":"*build.js"
                  }
                },"filter":{
                  "bool":{
                    "must":[{
                      "range":{
                        "@timestamp":{
                          "from":moment().subtract(1, 'days'),"to":"now"
                        }
                      }
                    }],"must_not":[{
                      "fquery":{
                        "query":{
                          "query_string":{
                            "query":"ua.name:(\"GoogleBot\" or \"YandexBot\" or \"BingBot\" or \"PhantomJS\")"
                          }
                        },"_cache":true
                      }
                    }]
                  }
                }
              }
            }
          }
        }
      }
    },"size":0
  };
};

var getTilesFlowLastHourHistogramPostData = function() {
  return{
    "facets":{
      "0":{
        "date_histogram":{
          "field":"@timestamp","interval":"1h"
        },"global":true,"facet_filter":{
          "fquery":{
            "query":{
              "filtered":{
                "query":{
                  "query_string":{
                    "query":"*"
                  }
                },"filter":{
                  "bool":{
                    "must":[{
                      "range":{
                        "@timestamp":{
                          "from":moment().subtract(1, 'days'),"to":"now"
                        }
                      }
                    }],"must_not":[{
                      "fquery":{
                        "query":{
                          "query_string":{
                            "query":"tags:((\"s3-tiles\" AND \"wmts\"))"
                          }
                        },"_cache":true
                      }
                    }]
                  }
                }
              }
            }
          }
        }
      }
    },"size":0
  };
};

var getTilesPerMinutePostData = function() {
  return {
    "filter":{
      "fquery":{
        "query":{
          "filtered":{
            "query":{
              "query_string":{
                "query":"*"
              }
            },"filter":{
              "bool":{
                "must":[{
                  "range":{
                    "@timestamp":{
                      "from":moment().subtract(60, 'seconds'),"to":moment()
                    }
                  }
                },{
                  "fquery":{
                    "query":{
                      "query_string":{
                        "query":"tags:((\"s3-tiles\" AND \"wmts\"))"
                      }
                    },"_cache":true
                  }
                }]
              }
            }
          }
        }
      }
    },"size":0
  };
};

var getTilesPerHourPostData = function() {
  return {
    "filter":{
      "fquery":{
        "query":{
          "filtered":{
            "query":{
              "query_string":{
                "query":"*"
              }
            },"filter":{
              "bool":{
                "must":[{
                  "range":{
                    "@timestamp":{
                      "from":moment().subtract(3600, 'seconds'),"to":moment()
                    }
                  }
                },{
                  "fquery":{
                    "query":{
                      "query_string":{
                        "query":"tags:((\"s3-tiles\" AND \"wmts\"))"
                      }
                    },"_cache":true
                  }
                }]
              }
            }
          }
        }
      }
    },"size":0
  };
};

var getQueriesPerMinutePostData = function() {
  return {
    "filter":{
      "fquery":{
        "query":{
          "filtered":{
            "query":{
              "query_string":{
                "query":"*"
              }
            },"filter":{
              "bool":{
                "must":[{
                  "range":{
                    "@timestamp":{
                      "from":moment().subtract(60, 'seconds'),"to":moment()
                    }
                  }
                }]
              }
            }
          }
        }
      }
    },"size":0
  };
};

var getPrintQueriesPerMinutePostData = function() {
  return {
    "filter":{
      "fquery":{
        "query":{
          "filtered":{
            "query":{
              "query_string":{
                "query":"print AND map.geo.admin.ch AND create.json"
              }
            },"filter":{
              "bool":{
                "must":[{
                  "range":{
                    "@timestamp":{
                      "from":moment().subtract(60, 'seconds'),"to":moment()
                    }
                  }
                }],
                "must_not":[{
                  "fquery": {
                    "query": {
                      "query_string": {
                        "query": "ua.name:(\"GoogleBot\" or \"YandexBot\" or \"BingBot\" or \"PhantomJS\")"
                      }
                    }, "_cache": true
                  }
                }]
              }
            }
          }
        }
      }
    },"size":0
  };
};

var getVisitsPerHourPostData = function() {
  return {
    "filter":{
      "fquery":{
        "query":{
          "filtered":{
            "query":{
              "query_string":{
                "query":"*build.js"
              }
            },"filter":{
              "bool":{
                "must":[{
                  "range":{
                    "@timestamp":{
                      "from":new moment().subtract(60, 'minutes'),"to":"now"
                    }
                  }
                }],"must_not":[{
                  "fquery":{
                    "query":{
                      "query_string":{
                        "query":"ua.name:(\"GoogleBot\" or \"YandexBot\" or \"BingBot\" or \"PhantomJS\")"
                      }
                    },"_cache":true
                  }
                }]
              }
            }
          }
        }
      }
    },"size":0
  };
};

var heatmap_delay = conf.get("heatmap_delay");
var getTilesPerNSecondsPostData = function(n) {
  return {
    "filter":{
      "fquery":{
        "query":{
          "filtered":{
            "query":{
              "query_string":{
                "query":"*"
              }
            },"filter":{
              "bool":{
                "must":[{
                  "range":{
                    "@timestamp":{
                      "from":moment().subtract(n+heatmap_delay, 'seconds'),"to":moment().subtract(heatmap_delay, 'seconds')
                    }
                  }
                },{
                  "fquery":{
                    "query":{
                      "query_string":{
                        "query":"tags:((\"s3-tiles\" AND \"wmts\"))"
                      }
                    },"_cache":true
                  }
                }]
              }
            }
          }
        }
      }
    }, 'size': conf.get("heatmap_tiles_limit")
  };
};

var getWMTSTopLayersPostData = function (layer) {
  return {
    "filter":{
      "fquery":{
        "query":{
          "filtered":{
            "query":{
              "query_string":{
                "query":"*map.geo.admin.ch"
              }
            },"filter":{
              "bool":{
                "must":[{
                  "range":{
                    "@timestamp":{
                      "from":new moment().subtract(1, 'hours'),"to":"now"
                    }
                  }
                },{
                  "fquery":{
                    "query":{
                      "query_string":{
                        "query":"tags:((\"s3-tiles\" AND \"wmts\"))"
                      }
                    },"_cache":true
                  }
                },{
                  "fquery":{
                    "query":{
                      "query_string":{
                        "query": "*map.geo.admin.ch"
                      }
                    },"_cache": true
                  }
                },{
                  "terms": {
                    "wmts.layer.raw": [
                      layer
                    ]
                  }
                }]
              }
            }
          }
        }
      }
    }, 'size': 0
  }
};

module.exports.getMapVisitsLastHourHistogramPostData = getMapVisitsLastHourHistogramPostData;
module.exports.getTilesFlowLastHourHistogramPostData = getTilesFlowLastHourHistogramPostData;
module.exports.getTilesPerMinutePostData = getTilesPerMinutePostData;
module.exports.getTilesPerHourPostData = getTilesPerHourPostData;
module.exports.getQueriesPerMinutePostData = getQueriesPerMinutePostData;
module.exports.getPrintQueriesPerMinutePostData = getPrintQueriesPerMinutePostData;
module.exports.getVisitsPerHourPostData = getVisitsPerHourPostData;
module.exports.getTilesPerNSecondsPostData = getTilesPerNSecondsPostData;
module.exports.getWMTSTopLayersPostData = getWMTSTopLayersPostData;
