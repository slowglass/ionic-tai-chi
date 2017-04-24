import { Component, EventEmitter, Input, Output } from '@angular/core';

declare var RGBColor: any;
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
    _col: string = "";

    yinStyle: any = {};
    yangStyle: any = {};
    spinner_state: string = "paused";

  test: boolean = false;
  @Output()
  clickSymbol: EventEmitter<any> = new EventEmitter();

  constructor() { }

  /**  @input {boolean} If true, pause the animation. */
  @Input()
  get paused(): boolean { return this._paused; }
  set paused(val: boolean) {
      this._paused = this.isTrueProperty(val);
      console.log("Paused set to " + val);
      this.load();
  }

  /**  @input {boolean} If true, pause the animation. */
  @Input()
  get colour(): string { return this._col; }
  set colour(val: string) {
      console.log("Colour set to " + val);
      this._col = val;
      this.load();
  }



  load() {
      this.spinner_state = (this._paused) ? "paused" : "running";
      if (this._col != "") {
          let yinC = new RGBColor(String(this._col));
          let yangC = new RGBColor(String(this._col));
          yangC.invert();
          this.yinStyle = { "fill": yinC.toHex() };
          this.yangStyle = { "fill": yangC.toHex() };
          console.log("Yang Colour set to " + yangC.toHex());
          console.log("Yin Colour set to " + yinC.toHex());
      } else {
          this.yinStyle = { };
          this.yangStyle = { };
      }
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
