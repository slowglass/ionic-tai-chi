import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';

import { TimersPage } from '../pages/timers/timers';
import { TimerPage } from '../pages/timer/timer';
import { TimerConfigPage } from '../pages/timer-config/timer-config';


import { FormsPage } from '../pages/forms/forms';
import { FormPage } from '../pages/form/form';

import { AboutPage } from '../pages/about/about';

import { SwimmingDragonPage, TabContentPage } from '../pages/swimming-dragon/swimming-dragon';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeAudio } from '@ionic-native/native-audio';
import { Device } from '@ionic-native/device';

import {YinYangComponent } from '../components/yin-yang/yin-yang'

import { IonicStorageModule } from '@ionic/storage';
import { Timers } from '../providers/timers/timers';
import { Forms } from '../providers/forms';
import { SoundPlayer } from '../providers/sound-player';

@NgModule({
  declarations: [
    MyApp,
    HomePage, AboutPage,
    SwimmingDragonPage, TabContentPage,
    TimersPage, TimerPage, TimerConfigPage,
    FormsPage, FormPage, 
    YinYangComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, AboutPage,
    SwimmingDragonPage,TabContentPage, 
    TimersPage, TimerPage, TimerConfigPage,
    FormsPage, FormPage,
    YinYangComponent
  ],
  providers: [
    StatusBar, SplashScreen, NativeAudio, Device,
    Timers, Forms,
    SoundPlayer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
