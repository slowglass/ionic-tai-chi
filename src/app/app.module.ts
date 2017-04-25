import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';

import { TimersPage } from '../pages/timers/timers';
import { TimerPage } from '../pages/timer/timer';
import { TimerConfigPage } from '../pages/timer-config/timer-config';

import { AboutPage } from '../pages/about/about';

import { SwimmingDragonPage, TabContentPage } from '../pages/swimming-dragon/swimming-dragon';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeAudio } from '@ionic-native/native-audio';
import { Device } from '@ionic-native/device';

import {YinYangComponent } from '../components/yin-yang/yin-yang'

import { IonicStorageModule } from '@ionic/storage';
import { Data } from '../providers/data';
import { SoundPlayer } from '../providers/sound-player';

@NgModule({
  declarations: [
    MyApp,
    HomePage, TimersPage, AboutPage,
    SwimmingDragonPage, TabContentPage,
    TimerPage, TimerConfigPage,
    YinYangComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, TimersPage, AboutPage,
    SwimmingDragonPage,TabContentPage, 
    TimerPage, TimerConfigPage,
    YinYangComponent
  ],
  providers: [
    StatusBar, SplashScreen, NativeAudio, Device,
    Data,
    SoundPlayer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
