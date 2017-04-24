#!/bin/bash

ionic platform remove browser
ionic platform remove android
ionic platform remove windows

ionic platform add windows
ionic platform add browser
ionic platform add android

ionic plugin add cordova-plugin-device
npm install --save @ionic-native/device

ionic plugin add cordova-plugin-nativeaudio
npm install --save @ionic-native/native-audio

cordova plugin add cordova-sqlite-storage --save
npm install --save @ionic/storage


