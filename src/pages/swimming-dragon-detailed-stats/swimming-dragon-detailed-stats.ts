import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

declare var d3: any;

@Component({
  selector: 'page-swimming-dragon-detailed-stats',
  templateUrl: 'swimming-dragon-detailed-stats.html'
})

export class SwimmingDragonDetailedStatsTab {
  private graph: any;
  private chart: any;
  private data: any;
  private speed: any;
  private spill: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SwimmingDragonDetailedStatsTab');
  }
  
}
