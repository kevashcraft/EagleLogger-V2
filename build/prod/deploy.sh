#!/bin/bash
#
# EagleLogger's release script
# builds a container tagged with the latest version,
# pushes it to docker hub, and then updates the k8s deployment
#

if [ -z $1 ]; then
	echo "ERROR: no app specified"
	echo "specify an app name, or 'all' to build and deploy everything"
	echo "Example: deploy.sh site"
	exit 1
fi

program=eaglelogger

if [ "$1" == "all" ]; then
  apps="api cron postgres site"
else
  apps=$1
fi

version=`git describe --abbrev=0`

for app in $apps; do
  docker build -t kevashcraft/$program-$app:$version -t kevashcraft/$program-www:latest -f build/prod/Dockerfile-$app .
  if [ -z $nopush ]; then
	  docker push kevashcraft/$program-$app:$version
	  docker push kevashcraft/$program-$appw:latest
	  kubectl set image deployment/$program-$app $program-$app=kevashcraft/$program-$app:$version
	fi
done

