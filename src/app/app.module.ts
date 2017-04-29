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

import { SwimmingDragonPage } from '../pages/swimming-dragon/swimming-dragon';
import { SwimmingDragonTimerTab } from '../pages/swimming-dragon-timer/swimming-dragon-timer'
import { SwimmingDragonSummaryStatsTab } from '../pages/swimming-dragon-summary-stats/swimming-dragon-summary-stats'
import { SwimmingDragonDetailedStatsTab } from '../pages/swimming-dragon-detailed-stats/swimming-dragon-detailed-stats'


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeAudio } from '@ionic-native/native-audio';
import { Device } from '@ionic-native/device';

import {YinYangTimer } from '../components/yin-yang/yin-yang'

import { IonicStorageModule } from '@ionic/storage';
import { Timers } from '../providers/timers/timers';
import { Forms } from '../providers/forms';
import { SoundPlayer } from '../providers/sound-player';
import { OrientationStore } from '../providers/orientation-store';
@NgModule({
  declarations: [
    MyApp,
    HomePage, AboutPage,
    SwimmingDragonPage, 
      SwimmingDragonTimerTab, SwimmingDragonSummaryStatsTab, SwimmingDragonDetailedStatsTab,
    TimersPage, TimerPage, TimerConfigPage,
    FormsPage, FormPage, 
    YinYangTimer
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, AboutPage,
    SwimmingDragonPage, 
      SwimmingDragonTimerTab, SwimmingDragonSummaryStatsTab, SwimmingDragonDetailedStatsTab,
    TimersPage, TimerPage, TimerConfigPage,
    FormsPage, FormPage,
    YinYangTimer
  ],
  providers: [
    StatusBar, SplashScreen, NativeAudio, Device,
    Timers, Forms,
    SoundPlayer,
    OrientationStore,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
