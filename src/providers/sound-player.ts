import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
//import { Device } from '@ionic-native/device';

declare var Howl:any; 
export class SoundPlayerNative {
	private playing: Map<string,boolean> = new Map<string,boolean>();
	constructor(private audio: NativeAudio) { }
	msg(name:string, result: string) { console.log("Native Sound " + name + " "+result); }
	addSound(name: string, url: string) {
		this.audio.preloadSimple(name,url).then(
	  		() => this.msg(name, 'Loaded'),
	  		() => this.msg(name, 'Failed to Load!!')
	  	);
	  }
	  play(name:string) {
		  if (this.playing[name] == true) return; 
		  this.playing[name] = true;
		  this.audio.play(name).then(
			  (res) => { this.playing[name] = false; }, 
			  (err) => { this.playing[name] = false; });
		 }
}

export class SoundPlayerHTML5 {
	private playing: Map<string,boolean> = new Map<string,boolean>();
	private sounds: Map<string,any>  = new Map<string,any>();
	constructor() { this.sounds }
	msg(name:string, result: string) { console.log("HTML5 Sound " + name + " " + result); }
	soundPlaying(name: string, status:boolean) { this.playing[name] = status; }
	addSound(name: string, url: string) {
		var self=this;
	  	this.sounds[name] = new Howl({ 
			  src: [url], 
			  onload: () => this.msg(name, 'Loaded'),
			  onloaderr: () => this.msg(name, 'Failed to Load!!'),
			  onend:  () => this.soundPlaying(name, true)});
	}
	play(name:string) { 
		if (this.playing[name] == true) return; 
		this.playing[name] = true;
		this.sounds[name].play();
	}
}

@Injectable()
export class SoundPlayer {

  private player: any;
  constructor(
  	platform: Platform,
  	audio: NativeAudio) {
  	if (platform.is('cordova'))
  		this.player = new SoundPlayerNative(audio);
  	else
  		this.player = new SoundPlayerHTML5();
  }

  addSound(name: string, url: string) { this.player.addSound(name, url); }
  play(name: string) { this.player.play(name); }
}

