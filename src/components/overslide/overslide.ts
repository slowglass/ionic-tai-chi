import { Directive, Output, ElementRef, Renderer, EventEmitter } from '@angular/core';
import { ItemSliding } from 'ionic-angular';
 
@Directive({
    selector: '[overslide]',
    host: {
        '(ionDrag)': 'handleDrag($event)'
    }
})
export class Overslide {
 
    @Output() overslide: any = new EventEmitter();
 
    triggered: boolean = false;
 
    constructor(public element: ElementRef, public renderer: Renderer) {  }
 
    handleDrag(ev:ItemSliding) {
        if(Math.abs(ev.getSlidingPercent()) > 1.7 && !this.triggered){
            let sp = ev.getSlidingPercent();
            ev.close();
            this.overslide.emit({triggered: true, slidingPercent: sp});
        }
    }
 
}