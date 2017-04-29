import { Injectable } from '@angular/core';

export class OrientationData {
  pitch: number;
  roll: number;
  angle: number;
}

export class OrientationStats {
  min: number;
  max: number;
  sum: number;
  asum: number;
  ssum: number;
  count: number;

  constructor() {
    this.reset();
  }
  reset() {
    this.min = this.max = null;
    this.asum = this.sum = this.ssum = 0;
    this.count = 0;
  }
  private firstUpdate(v : number)
  {
    this.min = this.max = this.sum = v;
    this.asum = Math.abs(v);
    this.ssum = (v*v);
    this.count = 1;
  }
  update(v: number) {
    if (this.min == null) return this.firstUpdate(v);
    this.min=Math.min(v, this.min);
    this.max=Math.max(v, this.max);
    this.sum += v;
    this.asum += Math.abs(v);
    this.ssum += (v*v);
    this.count ++;
  }

  get amax() { return Math.max(Math.abs(this.max), Math.abs(this.min)); }
  get avg() { return this.sum / this.count; }
  get aavg() { return this.asum / this.count; }
  get stdDev() { return Math.sqrt((this.ssum / this.count) - (this.avg * this.avg)); }
}
@Injectable()
export class OrientationStore {
  private pitchStats:OrientationStats = new OrientationStats();
  private rollStats:OrientationStats = new OrientationStats();
  private currentData:Array<OrientationData> = [];
  constructor() { }

  get(name:string): OrientationStats {
    if (name === "roll") return this.rollStats;
    if (name == "pitch") return this.pitchStats;
    return null;
  }
  start() {
    this.currentData = [];
    this.pitchStats.reset();
    this.rollStats.reset();
  }

  add(d:OrientationData) {
    this.currentData.push(d);
    this.pitchStats.update(d.pitch);
    this.rollStats.update(d.roll);
  }
  stop() {
  }

}
