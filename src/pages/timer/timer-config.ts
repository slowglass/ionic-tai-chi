export class TimerConfig 
{
    private label: string;
    private iterations: number;
    private period: number;
    private setup: {
        seconds: number,
        repeat: boolean 
    };
    private colour: string;

    constructor();
    constructor(o: Object);

    constructor(o?)
    {
        if (o == undefined) {
            this.label = "";
            this.iterations = 0;
            this.period = 0;
            this.setup = { seconds: 0, repeat: false };
            this.colour = "#000000";
        } else {
            this.label = o.label;
            this.iterations = o.iterations;
            this.period = o.period;
            this.setup = o.setup;
            this.colour = o.colour;
        }  
    }

    static newInstance(label: string, 
        iterations: number,
        period: number, 
        setup: number,
        repeatSetup: boolean,
        colour: string) {
        let tc = new TimerConfig();
        tc.label = label;
        tc.iterations = iterations;
        tc.period = Math.floor(period);
        tc.setup = {
            seconds: Math.floor(setup),
            repeat: repeatSetup
        }
        tc.colour = colour;
        return tc;
    }

    getColour() : string { return this.colour; }
    getDuration() {
        let s = this.period%60;
        let min = Math.floor(this.period/60);
        return { minutes: min, seconds: s };
    }
    getIterations() :number { return this.iterations; }
    getSetupTime() :number { return this.setup.seconds; }
    setupRepeats() :boolean { return this.setup.repeat; }

    static getTimeAsString(period) : string {
        let s:string = "";
        if (period.minutes<10) s += '0';
        s += period.minutes.toString();
        s+=":";
        if (period.seconds<10) s += '0';
        s += period.seconds.toString();
        return s;
    }

    static show(d, t) {
          console.log(d, "Class: "+ t.constructor.name); 
          console.log(d, "Data: "+ JSON.stringify(t)); 
    }
}
