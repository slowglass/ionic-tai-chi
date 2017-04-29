import { Utils } from '../../libs/utils'

export class TimerConfig {
    private static  repeatLabel:string = "seconds each iteration";
    private static  singleRunLabel:string = "seconds at start";

    public readonly label: string;
    public readonly imgNumber: number;
    public readonly iterations: number;
    public readonly period: number;
    public readonly setup: {
        seconds: number,
        repeat: boolean
    };
    public readonly colour: string;

    constructor();
    constructor(o: Object);

    constructor(o?) {
        if (o == undefined) {
            this.label = ""; this.colour = "#000000";
            this.iterations = this.period = 0;
            this.setup = { seconds: 0, repeat: false };
            
        } else {
            this.label = o.label; 
            this.colour = o.colour;
            this.imgNumber = o.imgNumber;
            this.iterations = o.iterations;
            this.period = o.period;
            this.setup = o.setup;
        }
    }

    static newInstance(label: string, imgNumber: number, iterations: number, period: number,
        setup: number, repeatSetup: boolean, colour: string) {
        let tc = new TimerConfig({
            label: label, imgNumber: imgNumber, 
            iterations: iterations, period: Math.floor(period),
            setup: {seconds: Math.floor(setup), repeat: repeatSetup },
            colour: colour
        });
        return tc;
    }

    equals(t: TimerConfig) {
        return (this.label == t.label && 
            this.imgNumber == t.imgNumber &&
            this.iterations == t.iterations &&
            this.period == t.period &&
            this.setup.seconds == t.setup.seconds &&
            this.setup.repeat == t.setup.repeat &&
            this.colour == t.colour);
    }

    getSetupAsString(): string {
        let l = (this.setup.repeat) ? TimerConfig.repeatLabel : TimerConfig.singleRunLabel;
        return "" + this.setup.seconds + "seconds each iteration";
    }
}