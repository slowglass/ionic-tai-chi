import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { ConfigPage } from '../pages/config/config';
import { AboutPage } from '../pages/about/about';

import { TimerPage } from '../pages/timer/timer';
import { TimerConfigPage } from '../pages/timer-config/timer-config';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { Data } from '../providers/data';

@NgModule({
  declarations: [
    MyApp,
    HomePage, ConfigPage, AboutPage,
    TimerPage, TimerConfigPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, ConfigPage, AboutPage,
    TimerPage, TimerConfigPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Data,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
