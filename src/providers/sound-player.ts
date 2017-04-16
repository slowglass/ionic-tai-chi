import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio';
import { Device } from '@ionic-native/device';

declare var Howl:any; 
export class SoundPlayerNative {
	constructor(private audio: NativeAudio) { }
	msg(name:string, result: string) { console.log("Sound " + name + "Loaded"); }
	addSound(name: string, url: string) {
		this.audio.preloadSimple(name,url).then(
	  		() => this.msg(name, 'Loaded'),
	  		() => this.msg(name, 'Failed to Load!!')
	  	);
		//this.sounds[name] = new Howl({ src: [url] });
	  }
	  play(name:string) { this.audio.play(name); }
}

export class SoundPlayerHTML5 {
	private sounds: Map<string,any>;
	constructor() { this.sounds = new Map<string,any>(); }
	msg(name:string, result: string) { console.log("Sound " + name + "Loaded"); }
	addSound(name: string, url: string) {
	  	this.sounds[name] = new Howl({ src: [url] });
	}
	play(name:string) { this.sounds[name].play(); }
}

@Injectable()
export class SoundPlayer {

  private player: any;
  constructor(
  	private device: Device,
  	private audio: NativeAudio) {
  	if (this.device.platform == null)
  		this.player = new SoundPlayerHTML5();
  	else
  		this.player = new SoundPlayerNative(audio);
  }

  addSound(name: string, url: string) { this.player.addSound(name, url); }
  play(name: string) { this.player.play(name); }
}

