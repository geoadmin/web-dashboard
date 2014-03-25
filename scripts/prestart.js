var config = require('../lib/Config.js');
config = config.get();

if (!config.get('ES_USERNAME')) {
  console.log('[WARNING] There is no ES_USERNAME in the config.json' +
              'or in the environment variables. This is used for the' +
              'basic authentication on logs.bgdi.ch. The application' +
              'will probably not be able to provide any data.');
}

if (!config.get('ES_PASSWORD')) {
  console.log('[WARNING] There is no ES_PASSWORD in the config.json' +
              'or in the environment variables. This is used for the' +
              'basic authentication on logs.bgdi.ch. The application' +
              'will probably not be able to provide any data.');
}
