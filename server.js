var dashing = require('dashing-js').Dashing();
var config = require('./lib/Config.js').get();
// Set your auth token here
//dashing.auth_token = 'YOUR_AUTH_TOKEN';

/*
dashing.protected = function(req, res, next) {
  // Put any authentication code you want in here.
  // This method is run before accessing any resource.
  // if (true) next();
}
*/

// Set your default dashboard here
//dashing.default_dashboard = 'mydashboard';
process.env.port = config.get('port') || 3030;
dashing.start();
