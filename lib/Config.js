var nconf = require('nconf');
var fs = require('fs');
nconf.argv().env();
nconf.add('secret',{type:'file', file: './config.json'});
if (fs.existsSync('/var/www/.web-dashboard')) {
  nconf.add('login', {type: 'file', file: '/var/www/.web-dashboard'});
}

nconf.set('port', nconf.get('port') || 3030);
nconf.set('apache_path', nconf.get('apache_path') || '');

module.exports.get = function() { return nconf; };
