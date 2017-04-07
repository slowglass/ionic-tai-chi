import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TimerPage } from '../pages/timer/timer';
import { TimerConfig } from '../pages/timer/timer-config';

import { Data } from '../providers/data';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public dataService: Data) {
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

  getTimers() {
    return this.dataService.getTimers();
  }

  openTimer(timer) {
    TimerConfig.show("MyApp:Menu", timer);
    this.nav.push(TimerPage, { timer: timer });
  }
  
  openPage(page) {
    
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





