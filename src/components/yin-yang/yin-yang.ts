import { Component, EventEmitter, Input, Output } from '@angular/core';

/*
  Generated class for the YinYang component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'yin-yang',
  templateUrl: 'yin-yang.html'
})
export class YinYangComponent {
  _paused: boolean = false;
  spinner_state: string = "paused";

  @Output()
  clickSymbol: EventEmitter<any> = new EventEmitter();

  constructor() { }

  /**  @input {boolean} If true, pause the animation. */
  @Input()
  get paused(): boolean { return this._paused; }
  set paused(val: boolean) { this._paused = this.isTrueProperty(val); this.load(); }

  load() {
    this.spinner_state = (this._paused) ? "paused" : "running";
  }

  isTrueProperty(val: any): boolean {
    if (typeof val === 'string') {
      val = val.toLowerCase().trim();
      return (val === 'true' || val === 'on' || val === '');
    }
    return !!val;
  }

  click() {
    this.clickSymbol.emit();
    console.log("Need Callback");
  }

}
