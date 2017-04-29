import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { SDTimerConfig } from '../../providers/sdtimers/config';
import { SoundPlayer } from '../../providers/sound-player'
import { OrientationStore, OrientationData } from '../../providers/orientation-store'
import { YinYangTimer, TimerIteration } from "../../components/yin-yang/yin-yang"
import { Utils } from "../../libs/utils"
import { Spill } from "../../libs/spill"

@Component({
  selector: 'page-swimming-dragon-timer',
  templateUrl: 'swimming-dragon-timer.html'
})
export class SwimmingDragonTimerTab {
  public config: SDTimerConfig;
  
  private spill: Spill;
  private phomeMoveCB;
  @ViewChild(YinYangTimer) yyTimer;

  // Display Variables bound to UI
  private topLabel = "Unset";
  private bottomLabel = "Unset";
  private colour = "#440088";
  private iterations:Array<TimerIteration> = [ ];

  constructor(
    private events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    public soundPlayer: SoundPlayer,
    public orientationStore: OrientationStore) {

    // Config of Swimming Dragon Timer
    this.config = SDTimerConfig.newInstance("Swimming Dragon", 0, 60, 5, "#603060", 10);

    //  Add Sounds to Sound Player
    this.soundPlayer.addSound("onMinuteEnd", "assets/sound/ting.wav");
    this.soundPlayer.addSound("onIterationEnd", "assets/sound/templeBell.wav");
    this.soundPlayer.addSound("onTimerEnd", "assets/sound/templeBell.wav");

    var self = this;
    this.phomeMoveCB = function(e) { self.phoneMove(e); }
  }

  ionViewWillEnter() {
    this.colour = this.config.colour;
    this.topLabel = "";
    let dur = Utils.getDuration(this.config.period);
    this.bottomLabel = Utils.getTimeAsString(dur.minutes, dur.seconds);
    this.buildIterationsArray();
    this.spill = new Spill(this.config.spill, this.soundPlayer);
  }

  ionViewWillLeave() {
    this.yyTimer.stop();
  }

  buildIterationsArray() {
    var iters = [];
    var sdur = this.config.setup;
    var dur = Utils.getDuration(this.config.period);
    if (sdur>0)
      iters.push({label: "Setup", minutes: 0, seconds: sdur });
    
    iters.push({label: "Perform", minutes: dur.minutes, seconds: dur.seconds });
    
    this.iterations = iters;
  }
  
  phoneMove(event: any) {
    // Mapping (beta, gamma) => (roll,pitch)
    // Make sure value in range [-180,180]
    if (event.alpha == null) return;
    var alpha = (event.alpha > 180) ? event.alpha - 360 : event.alpha;
    var d = new OrientationData();
    d.angle = alpha;
    d.roll= event.beta;
    d.pitch= event.gamma;
    this.spill.tilt(d.pitch, d.roll);
    this.orientationStore.add(d);
  }


  startOrientationListener() {
    window.addEventListener("deviceorientation", this.phomeMoveCB);
    this.orientationStore.start();
    this.events.publish("swimming-dragon", "clear");
    this.spill.start();
  }

  stopOrientationListener() {
    window.removeEventListener("deviceorientation", this.phomeMoveCB);
    this.orientationStore.stop();
    this.events.publish("swimming-dragon", "refresh");
    this.spill.stop();
  }

  onMinuteEnd() { this.soundPlayer.play("onMinuteEnd"); }
  onChange($event) {
    switch ($event.change) {
      case "start": 
        // Startup time is 0
        if (this.iterations.length == 1)
          this.startOrientationListener();
        break;
      case "next": 
        // Turn On after first start up
        if ($event.iteration == 1)
          this.startOrientationListener();
        this.soundPlayer.play("onIterationEnd");
        break;
      case "end": 
        this.soundPlayer.play("onTimerEnd");
        this.stopOrientationListener();
        break;
      case "stop":
        this.stopOrientationListener();
        break;
    }
  }

  configTimer() {
    // TODO
  }

}
