#!/bin/bash

cd dist/cordova
cordova platform add android@6.4.0
cordova plugin add cordova-plugin-local-notification
cordova-icon --icon ../../src/graphics/eaglelogger.png
if [ "$1" == "production" ]; then
  cordova build --release android
else
  cordova run android
fi
