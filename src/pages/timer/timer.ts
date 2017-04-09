import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TimerConfig } from './timer-config';

declare var Howl:any; 

/*
  Generated class for the Timer page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-timer',
  templateUrl: 'timer.html'
})
export class TimerPage {
  private timer: TimerConfig;
  private current;
  private timerCallbackId = null;
  private callbacks = { minRollover: null, iterRollover: null, finished: null };
  private sounds = { end: null, min: null };

  public display = { time: "", iteration: "", fg: "#000", bg: "#fff", spin: 'paused'};
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams)
    {
      this.timer = new TimerConfig();
      this.current = { state: "STATIONARY", min: 0, sec: 0, iter: -1 };
      this.callbacks.minRollover = () => this.sounds.min.play();
      this.callbacks.iterRollover = () => this.sounds.end.play();
      this.callbacks.finished = () => this.sounds.end.play();

      this.sounds.end = new Howl({  src: ["assets/sound/templeBell.wav"]});
      this.sounds.min = new Howl({  src: ["assets/sound/ting.wav"]});
    }

  colToString(c) {
    return "rgb(" + 
      c.r.toString() + "," + 
      c.g.toString() + "," + 
      c.b.toString() + ")";
  }

  convertHex(hex) {
    var r = parseInt(hex.substring(1,3), 16);
    var g = parseInt(hex.substring(3,5), 16);
    var b = parseInt(hex.substring(5,7), 16);
    return { r:r, b:b, g:g};
  }

  yangColour(c) {
    return { r:255-c.r, b:255-c.b, g:255-c.g};
  }

  ionViewDidLoad() {
    this.timer = new TimerConfig(this.navParams.get('timer'));
    var c = this.convertHex(this.timer.getColour());
    this.display.fg = this.colToString(c);
    this.display.bg = this.colToString(this.yangColour(c));
    this.display.time = TimerConfig.getTimeAsString(this.timer.getDuration());
    this.display.iteration = this.timer.getIterations().toString();
  }

  ionViewWillLeave() {
    this.stop();
  }

  resetTimeEvent() {
    if (this.timerCallbackId!=null) clearInterval(this.timerCallbackId);
    this.timerCallbackId = null;
  }

  startTimeEvent() {
    var self = this;
    this.resetTimeEvent();
    this.timerCallbackId=setInterval(function() { self.tick(); }, 1000);
  }

  toggle() {
    if (this.current.state == "SPINNING")
      this.stop();
    else
      this.start();
  }
  
  start() {
    let t:TimerConfig=this.timer;
    this.display.spin = 'running';
    console.log("MultiTimer", "Start");
    this.current = { state: "SPINNING", min: 0, sec: t.getSetupTime(), iter: t.getIterations() *2 };
    this.startTimeEvent();
    this.updateDisplay();
  }

  stop() {
    console.log("MultiTimer", "Stop");
    this.display.spin = 'paused';
    this.resetTimeEvent();
    this.current = { state: "STATIONARY", min: 0, sec: 0, iter: -1 };
    this.updateDisplay();
  }

  tick() {
    let t=this.timer;
    var callback=null;
    this.current.sec--;
    if (this.current.sec<0) { 
      this.current.sec= 59; 
      this.current.min--; 
      callback=this.callbacks.minRollover;
    }
    if (this.current.min<0) {
      this.current.iter--;
      callback=this.callbacks.iterRollover;
      if (this.current.iter%2 == 0) {
        if (t.setupRepeats()) { 
          this.current.sec=t.getSetupTime(); 
          this.current.min=0; 
        }
        else this.current.iter--;
      }
      if (this.current.iter%2 == 1) { 
        this.current.min=t.getDuration().minutes;
        this.current.sec= t.getDuration().seconds; 
      }
    }
    this.updateDisplay();
    if (callback != null) callback();
    if (this.current.iter<0)
    {
      this.stop();
      if (this.callbacks.finished != null) this.callbacks.finished();
    }
  }
  
  updateDisplay() { 
    let t=this.timer;
    if (this.current.iter<0) { 
      var rep = t.setupRepeats() ? "+" : "";
      this.display.iteration = t.getIterations().toString();
      this.display.time = TimerConfig.getTimeAsString(t.getDuration()) + rep;
    } else {
      if (this.current.iter%2 == 0) this.display.iteration = "Setup"; 
      else this.display.iteration = ((this.current.iter+1)/2).toString();
      this.display.time = TimerConfig.getTimeAsString({ minutes: this.current.min, seconds: this.current.sec }); 
    }

    console.log("MultiTimer", "Update");
    console.log("MultiTimer", "   Iteration: "+this.display.iteration);
    console.log("MultiTimer", "   Time:      "+this.display.time);

  }
}
