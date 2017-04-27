﻿import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { AboutPage } from '../pages/about/about';
import { SwimmingDragonPage } from '../pages/swimming-dragon/swimming-dragon';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  aboutPage: any = AboutPage;
  sdPage: any = SwimmingDragonPage;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen) {
      this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}


// Look at https://ionicframework.com/docs/v2/api
//  AlertController
//  Input
//  LoadingController
//  ModalController
//  Select / Option
//  Range

// https://ionicframework.com/docs/v2/components/
// Cards
// Sliding List

// https://ionicframework.com/docs/v2/native/device-orientation/
// Device Orientation
// Device Motion
// Status Bar
// Splash Screen
// Background Mode





