import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { ConfigPage } from '../pages/config/config';
import { AboutPage } from '../pages/about/about';

import { TimerPage } from '../pages/timer/timer';
import { TimerConfigPage } from '../pages/timer-config/timer-config';
import { SwimmingDragonPage, TabContentPage } from '../pages/swimming-dragon/swimming-dragon';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { Data } from '../providers/data';
import { SoundPlayer } from '../providers/sound-player';

@NgModule({
  declarations: [
    MyApp,
    HomePage, ConfigPage, AboutPage,
    SwimmingDragonPage, TabContentPage,
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
    SwimmingDragonPage,TabContentPage, 
    TimerPage, TimerConfigPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Data,
    SoundPlayer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
