var config = require('../lib/Config.js');
var apache = require('../lib/ApacheConfigCompiler.js');
config = config.get();

// checking if username and password are available otherwise throwing a warning!
if (!config.get('ES_USERNAME')) {
  console.log('[WARNING] There is no ES_USERNAME in the config.json ' +
              'or in the environment variables. This is used for the ' +
              'basic authentication on logs.bgdi.ch. The application ' +
              'will probably not be able to provide any data.');
}

if (!config.get('ES_PASSWORD')) {
  console.log('[WARNING] There is no ES_PASSWORD in the config.json ' +
              'or in the environment variables. This is used for the ' +
              'basic authentication on logs.bgdi.ch. The application ' +
              'will probably not be able to provide any data.');
}

//compile the apache config file.
console.log("compiling apache script.");
apache.compile();
