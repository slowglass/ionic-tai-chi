
import { SoundPlayer } from '../providers/sound-player'

export class Spill {
    private running:boolean = false;
    constructor(private threshold: number, private soundPlayer: SoundPlayer) {

      this.soundPlayer.addSound("onSpill", "assets/sound/water.wav");
    }

    tilt(pitch, roll) {
        let tilt = Math.max(Math.abs(pitch), Math.abs(roll));

        if (this.running && tilt>this.threshold)
            this.soundPlayer.play("onSpill");
    }

    start() { this.running=true; }
    stop() { this.running=false; }
}