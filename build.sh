#!/bin/bash

ionic platform remove browser
ionic platform remove android
ionic platform remove windows

ionic plugin remove --save cordova-plugin-device
ionic plugin remove --save cordova-plugin-nativeaudio
ionic plugin remove --save cordova-sqlite-storage
ionic plugin remove --save cordova-plugin-splashscreen
ionic plugin remove --save cordova-plugin-statusbar
ionic plugin remove --save cordova-plugin-inappbrowser

npm uninstall --save @ionic-native/core
npm uninstall --save @ionic-native/device
npm uninstall --save @ionic-native/device-orientation
npm uninstall --save @ionic-native/in-app-browser
npm uninstall --save @ionic-native/media
npm uninstall --save @ionic-native/native-audio
npm uninstall --save @ionic-native/splash-screen 
npm uninstall --save @ionic-native/status-bar
npm uninstall --save @ionic/storage
ionic cache clean

ionic platform add windows browser  android

ionic plugin add --save cordova-plugin-device
ionic plugin add --save cordova-plugin-nativeaudio
ionic plugin add --save cordova-sqlite-storage
ionic plugin add --save cordova-plugin-splashscreen
ionic plugin add --save cordova-plugin-statusbar
ionic plugin add --save cordova-plugin-inappbrowser
ionic plugin add --save cordova-plugin-dialogs
ionic plugin add --save cordova-plugin-app-version

npm install --save @ionic-native/core
npm install --save @ionic-native/device
npm install --save @ionic-native/device-orientation
npm install --save @ionic-native/in-app-browser
npm install --save @ionic-native/media
npm install --save @ionic-native/native-audio
npm install --save @ionic-native/splash-screen 
npm install --save @ionic-native/status-bar
npm install --save @ionic-native/dialogs
npm install --save @ionic-native/app-version
npm install --save @ionic/storage

npm install --save angular2-elastic


