/* Angular Modules */
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

/* Third Party Angular Modules */
import { ElasticModule } from 'angular2-elastic';

/* Ionic Modules */
import { IonicStorageModule } from '@ionic/storage';

/* Ionic Native */  
import { AppVersion } from '@ionic-native/app-version';  
import { Device } from '@ionic-native/device';
import { Dialogs } from '@ionic-native/dialogs';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NativeAudio } from '@ionic-native/native-audio';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

/* Directives */

/* Components */
import { YinYangTimer } from '../components/yin-yang/yin-yang'

/* Pages */
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';

import { AboutPage } from '../pages/about/about';

import { TimersPage } from '../pages/timers/timers';
import { TimerPage } from '../pages/timer/timer';
import { TimerConfigPage } from '../pages/timer-config/timer-config';

import { FormsPage } from '../pages/forms/forms';
import { FormPage } from '../pages/form/form';

import { SwimmingDragonPage } from '../pages/swimming-dragon/swimming-dragon';
import { SwimmingDragonTimerTab } from '../pages/swimming-dragon-timer/swimming-dragon-timer'
import { SwimmingDragonSummaryStatsTab } from '../pages/swimming-dragon-summary-stats/swimming-dragon-summary-stats'
import { SwimmingDragonDetailedStatsTab } from '../pages/swimming-dragon-detailed-stats/swimming-dragon-detailed-stats'

import { NotebookPage } from '../pages/notebook/notebook';
import { NotesPage } from '../pages/notes/notes';

/* Providers */
import { Timers } from '../providers/timers/timers';
import { Forms } from '../providers/forms';
import { SoundPlayer } from '../providers/sound-player';
import { OrientationStore } from '../providers/orientation-store';
import { Dropbox } from '../providers/dropbox';
import { NoteReferenceStore } from '../providers/notes/notebook';

@NgModule({
  declarations: [
    MyApp,
    HomePage, AboutPage,
    TimersPage, TimerPage, TimerConfigPage,
    FormsPage, FormPage, 
    NotebookPage, NotesPage,
    SwimmingDragonPage, 
      SwimmingDragonTimerTab, 
      SwimmingDragonSummaryStatsTab, 
      SwimmingDragonDetailedStatsTab,
    
    YinYangTimer

  ],
  imports: [
    ElasticModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, AboutPage,
    TimersPage, TimerPage, TimerConfigPage,
    FormsPage, FormPage,
    NotebookPage, NotesPage,
    SwimmingDragonPage, 
      SwimmingDragonTimerTab,
      SwimmingDragonSummaryStatsTab,
      SwimmingDragonDetailedStatsTab
  ],
  providers: [
    AppVersion, Device, Dialogs, InAppBrowser,
    NativeAudio, SplashScreen, StatusBar,
    Timers, Forms, NoteReferenceStore,
    SoundPlayer,
    OrientationStore,
    Dropbox, 
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
