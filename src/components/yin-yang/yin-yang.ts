import { Component, EventEmitter, Input, Output } from '@angular/core';

declare var RGBColor: any;

export class TimerIteration {
  public minutes: number;
  public seconds: number;
  public label: string;
}

@Component({
  selector: 'yin-yang',
  templateUrl: 'yin-yang.html'
})
export class YinYangTimer {
  
  @Input()
  get colour(): string { return this._col; }
  set colour(val: string) { this._col = val; this.load(); }
  _col: string = "";

  @Input()
  get topLabel(): string { return this._topLabel; }
  set topLabel(val: string) { this._topLabel = val; if (this.notInIteration()) this.label = val; } 
  _topLabel: string = "Unknown";

  @Input()
  get bottomLabel(): string { return this._bottomLabel; }
  set bottomLabel(val: string) { this._bottomLabel = val; if (this.notInIteration()) this.timeLabel = val; } 
  _bottomLabel: string = "??:??";

  @Input()
  get iterations():Array<TimerIteration> { return this._iterations; }
  set iterations(val: Array<TimerIteration>) { this._iterations=val;  }
  _iterations: Array<TimerIteration>;
  
  @Output() onMinuteEnd: EventEmitter<any> = new EventEmitter();
  @Output() onChange: EventEmitter<any> = new EventEmitter();
 
  yinStyle: any = {};
  yangStyle: any = {};
  
  private spinner_state: string = "paused";
  private seconds: number = 0;
  private minutes: number = 0;
  private iteration: number = -1;
  private label: string = "";
  private timeLabel: string = "";
  private tickEvent: number = null;

  constructor() { 
    this.load();
    this.resetLabels();
  }


  start() {
    this.spinner_state = "running";
    this.startIter();
    this.startTimeEvent();
    this.timeLabel = this.getTimeAsString();
  }

  stop() {
    this.spinner_state = "paused";
    this.resetLabels();
    this.resetTimeEvent();
    this.onChange.emit({change: "stop"});
  }

  toggle() {
    if (this.spinner_state === "running")
      this.stop();
    else
      this.start();
  }

  static getTimeAsString(mins:number, secs: number)
  {
    let s: string = "";
    if (mins < 10) s += '0';
    s += mins.toString();
    s += ":";
    if (secs < 10) s += '0';
    s += secs.toString();
    return s;
  }

  private load() {
    if (this._col != "") {
      let yinC = new RGBColor(String(this._col));
      let yangC = new RGBColor(String(this._col));
      yangC.invert();
      this.yinStyle = { "fill": yinC.toHex() };
      this.yangStyle = { "fill": yangC.toHex() };
      console.log("Yang Colour set to " + yangC.toHex());
      console.log("Yin Colour set to " + yinC.toHex());
    } else {
      this.yinStyle = {};
      this.yangStyle = {};
    }
  }

  private getTimeAsString() {
    let s: string = "";
    if (this.minutes != null) 
      s = YinYangTimer.getTimeAsString(this.minutes, this.seconds);
    return s;
  }

  private startIter() {
    this.iteration = 0;
    if (this.notInIteration()) { this.resetLabels(); return; }
    let c:TimerIteration = this._iterations[0];
    this.minutes = c.minutes;
    this.seconds = c.seconds;
    this.label = c.label;
    this.onChange.emit({ change: "start" });
  }

  private incrIter() {
    this.iteration++;
    if (this.notInIteration())  { this.resetLabels(); return; }
    let c:TimerIteration = this._iterations[this.iteration];
    this.minutes = c.minutes;
    this.seconds = c.seconds;
    this.label = c.label;
  }

  private resetLabels() {
    this.iteration = -1;
    this.minutes = null;
    this.seconds = null;
    this.label = this._topLabel;
    this.timeLabel = this._bottomLabel;
  }

  private notInIteration() {
    return (this.iteration == -1 || this._iterations == null || this._iterations.length <= this.iteration);
  }

  private startTimeEvent() {
    var self = this;
    this.resetTimeEvent();
    this.tickEvent = setInterval(function () { self.tick(); }, 1000);
  }

  private resetTimeEvent() {
    if (this.tickEvent != null) clearInterval(this.tickEvent);
    this.tickEvent = null;
  }

  private tick() {
    let minRollover:boolean = false;
    var eventEmmitter = null;
    this.seconds--;
    if (this.seconds < 0) {
      minRollover = true;
      this.seconds = 59; this.minutes--;
      eventEmmitter = this.onMinuteEnd;
    }
    
    if (this.minutes < 0) {
      minRollover = false; // Do not do min rollover if we are doing Boundry rollover
      this.incrIter();
      let change = (this.iteration == -1) ? "end" : "next";
      this.onChange.emit({change: change, iteration: this.iteration });
    }
    
    if (this.iteration == -1) this.stop();
    

    if (minRollover) this.onMinuteEnd.emit();

    if (this.notInIteration())  
      this.resetLabels();
    else
      this.timeLabel = this.getTimeAsString();
  }
}
