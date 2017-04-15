import { Injectable } from '@angular/core';

declare var Howl:any; 

@Injectable()
export class SoundPlayer {

  private sounds :Map<string,any>;

  constructor() {
  }

  addSound(name: string, url: string) {
	this.sounds[name] = new Howl({ src: [url] });
  }

  play(name:string) {
  	this.sounds[name].play();
  }
  
}
