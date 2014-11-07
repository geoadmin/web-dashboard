Web-dashboard
=========

Next generation web-dashboard

This Project uses dashing-js which is a nodejs port of the Dashing Ruby library

Check out https://github.com/fabiocaseri/dashing-js and http://dashing.io/ for more information.


# Getting started

Checkout the source code:

    $ git clone https://github.com/geoadmin/web-dashboard.git

or when you're using ssh key (see https://help.github.com/articles/generating-ssh-keys):

    $ git clone git@github.com:geoadmin/web-dashboard.git

Build:

    $ make all

Use `make help` to know about the possible `make` targets and the currently set variables:

    $ make help

You should customize the build by creating an `webrc` file that you source once. Ex:  

    $ cat webrc_ltpoa
    export port=3031
    export PORT=3031
    $ source webrc_ltpoa
    $ make  

Port 3030 is reserved for master instance

After this customization, Use `make start` to start the webdashboard locally

    $ make start

If you want to be sure the server is running you can use:

    $ make status

For shutting down the server, just use:

    $ make stop

If you want to quickly rebuild and restart your project just use:

    $ make restart

For builds on test (webrc_dev), integration (webrc_int), 
you should source the corresponding `webrc` file.

## Dependencies

The GeoAdmin team development servers all contain the necessary dependencies
to develop web-dashboard. Even if developement of the project outside of the
GeoAdmin infrastructure is not fully supported (e.g. you would need to
setup your own web server with correct configurations), you should still
be able to build the project on a different, Linux based infrastructure.

This is a node-js based project so you should be able to get all dependencies using:

    npm install

if the package.json was correctly cloned to your folder

# Deploying project and branches

## Deploying the project to dev and int

Do the following **inside your working directory**:

`make deploydev SNAPSHOT=true`

This updates the source in /var/www...to the latest master branch from github,
builds it from scratch, runs the tests and creates a snapshot. The snapshot directory
will be shown when the script is done. *Note*: you can omit the `SNAPSHOT=true` parameter if
you don't want to create a snapshot e.g. for intermediate releases on dev main.

A snapshot (e.g. 201407031411) can be deployed to integration with:

`make deployint SNAPSHOT=201407031411 ` (not fully implemented yet)


Note: we should NOT manually adapt code in /var/www/vhosts/mf-geoadmin3 directory

## Deploying a branch (functionnality not implemented due to proxy issues related to dashing-js)

