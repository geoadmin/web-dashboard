#!/bin/bash
#Deployment script for web-dashboard on DEV

T="$(date +%s)"

#bail out on any error
set -o errexit

# branch used for deploy (to adapt if any recovery from branches)
GITBRANCH=master

BASEDIR=/var/www/vhosts/web-dashboard/private/
SNAPSHOT=`date '+%Y%m%d%H%M'`
SNAPSHOTDIR=$BASEDIR/snapshots/$SNAPSHOT

# parse parameter (if -s is specified, snapshot will be created)
CREATE_SNAPSHOT='false'
if [ "$1" == "-s" ]
then
  CREATE_SNAPSHOT='true'
fi

# build latest 'master' version on dev
cd $BASEDIR/web-dashboard

# remove all local changes and get latest GITBRANCH from remote
git fetch --all && git reset --hard && git checkout $GITBRANCH && git reset --hard origin/$GITBRANCH

# build the project
source webrc_dev
make stop clean all start

# restart apache
sudo apache2ctl graceful

echo "Deployed branch $GITBRANCH to dev main."

# create a snapshot

if [ $CREATE_SNAPSHOT == 'true' ]; then
    sudo -u deploy deploy -c deploy/deploy.cfg $SNAPSHOTDIR
    echo "Snapshot of branch $GITBRANCH created at $SNAPSHOTDIR"
else
    echo "NO Snapshot created. Specify '-s' parameter got create snapshot."
fi

T="$(($(date +%s)-T))"

printf "Deploy time: %02d:%02d:%02d\n" "$((T/3600%24))" "$((T/60%60))" "$((T%60))"

