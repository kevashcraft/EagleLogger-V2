#!/bin/bash

cd dist/cordova
cordova platform add android@6.4.0
cordova-icon --icon ../../src/graphics/eaglelogger.png
if [ "$1" == "production" ]; then
  cordova build --release android
else
  cordova run android
fi
