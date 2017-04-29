import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SwimmingDragonTimerTab } from '../swimming-dragon-timer/swimming-dragon-timer'
import { SwimmingDragonSummaryStatsTab } from '../swimming-dragon-summary-stats/swimming-dragon-summary-stats'
import { SwimmingDragonDetailedStatsTab } from '../swimming-dragon-detailed-stats/swimming-dragon-detailed-stats'

@Component({
  selector: 'page-swimming-dragon',
  templateUrl: 'swimming-dragon.html'
})
export class SwimmingDragonPage {

  tab1Root: any = SwimmingDragonTimerTab;
  tab2Root: any = SwimmingDragonSummaryStatsTab;
  tab3Root: any = SwimmingDragonDetailedStatsTab;
  tab4Root: any = SwimmingDragonDetailedStatsTab;

  constructor(public navCtrl: NavController) {

  }

}