import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { OrientationStore, OrientationStats } from "../../providers/orientation-store"
import { Utils } from "../../libs/utils"

@Component({
  selector: 'page-swimming-dragon-summary-stats',
  templateUrl: 'swimming-dragon-summary-stats.html'
})
export class SwimmingDragonSummaryStatsTab {
  private pitch = { min: null, max: null, avg: null, aavg: null, sd: null };
  private roll = { min: null, max: null, avg: null, aavg: null, sd: null };
  constructor(
    private events: Events,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private orientationStore: OrientationStore)
    {
      this.events.subscribe('swimming-dragon', (type) => { this.redraw(type); });
    }

    ionViewWillEnter() {
      this.redraw("init")
    }

    resetStat(stat)
    {
      stat =  { min: null, max: null, avg: null, aavg: null, sd: null };
    }

    refeshStats(name, stat)
    {
      let orStats: OrientationStats = this.orientationStore.get(name);
      stat.min = Utils.fixed(orStats.min);
      stat.max = Utils.fixed(orStats.max);
      stat.avg = Utils.fixed(orStats.avg);
      stat.aavg = Utils.fixed(orStats.aavg);
      stat.sd= Utils.fixed(orStats.stdDev);
    }

    redraw(type) {
      if (type=="clear")
      {
          this.resetStat(this.roll);
          this.resetStat(this.pitch);
      } else   {
        this.refeshStats("pitch", this.pitch);
        this.refeshStats("roll", this.roll);
      }
    }
}
