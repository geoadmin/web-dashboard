Dashboard
=========

This Project uses dashing-js

Check out http://fabiocaseri.github.io/dashing-js for more information.

Deploy Process
==============
Use *sudo -u deploy deploy -r deploy/deploy.cfg [int|pord]* to deploy from the cwd. What happens is:
- The code gets rsynced according to the **deploy/deploy.cfg** file.
- The post-restore-code hook is run (**deploy/hooks/post-restore-code**)
 - *npm install* will download all node dependencies if they are not already rsynced.
 - *npm stop* will stop the web-dashboard daemon if it was already running. The pid is found in **/var/www/vhost/web-dashboard/private/web-dashboard.pid**. (This can be configured in **dashboardctrl.js**)
 - *npm start* is run
   - *scripts/prestart.js* runs. This compiles apache/web-dashboard.conf.mst and warns you if some critical configs are missing.
    - *node dashboardctrl.js start* runs. This starts the server as a daemon and writes the pid file to **/var/www/vhost/web-dashboard/private/web-dashboard.pid**.
 - apache restarts

Compatibility Issues
====================
Due to compatibility issues with IE9 and IE10 we don't take dashing-js from the npm repo but from the geoadmin/dashing-js fork. This fork has applied the changes from https://github.com/fabiocaseri/dashing-js/pull/17/files. As soon as these changes or other compatibility measurements are made in the main repo you can switch the dependencies back.

Config Files
============
Using the nconf nodejs module 3 config files get loaded in descending priority:
- **./.config.json** - Your secret/private configurations. They are ignored by git and contain mainly the basic auth.
- **./config.json** - General configurations file.
- **/var/www/.web-dashboard** - Server/deploy configuration. On deploy/int servers this file should be managed by puppet.

.config.json example:
```json
{
  "_comment": "This file will be merged with config.json but contains personal configs.",
  "_comment": "You can specify any configs with environment as well",
  "ES_USERNAME": "---",
  "ES_PASSWORD": "---",
  "port": "3031",
}
```
The username and password are used for the basic auth challenge on the elastic search server. The port is specified as every user developing on the mf0 machine should have his own port.
config.json example:
```json
{
  "_insecure": "if set to true ssl problems will be ignored. use with caution.",
  "insecure": "true",
  "_heatmap_delay": "How old the tiles are that are shown in the heatmap in seconds. Realtime will most likely have too view tiles.",
  "heatmap_delay": 50,
  "_heatmap_tiles_limit": "The limit of how many tiles are queried and displayed on the map.",
  "heatmap_tiles_limit": 200,
  "remote_host":"logs.bgdi.ch",
  "ssl": "true"
}
```
The "insecure" flag can be removed as soon as proper ssl is available on logs.bgdi.ch. The heatmap delay and tiles limit can be altered as soon as the server is performant enough to handle bigger response payloads.
The **/var/www/.web-dashboard** file should be very similar to the **.config.json** file but with the system user and the project specific port.

Apache Config
=============

In order to make the application accessible via the standard port 80 we have to configure apache as a reverse proxy for this nodejs application. The config is stored within the apache folder and looks like this:
```apache
ProxyVia Off
ProxyRequests On
ProxyPass / http://localhost:3030/
ProxyPassReverse / http://localhost:3030/
ProxyPreserveHost On
ProxyStatus Full
ProxyReceiveBufferSize 0
<Proxy *>
Order allow,deny
Allow from all
</Proxy>
```

It gets compiled from the file **apache/web-dashboard.conf.mst** which is a mustache template. Everytime npm start is called the precompile script will render this file. The only thing that changes currently is the port.

Nodejs App as a Daemon
======================
We want to be able to start/stop the web-dashboard like the apache server with: "npm start" and "npm stop". Thus we use the daemonize module of node. It's used in ***dashboardctrl.js***. We change the package.json to use node dashboardctrl.js start/stop for a starting/stoping command.

