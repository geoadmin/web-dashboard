var nconf = require('nconf');
nconf.argv().env().file('config.json').add('secret-file', {type: 'file', file: '.config.json'});

module.exports.get = function() { return nconf; };
