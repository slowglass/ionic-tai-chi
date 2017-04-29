
export class SDTimerConfig {
    public readonly label: string;
    public readonly imgNumber: number;
    public readonly iterations: number;
    public readonly period: number;
    public readonly setup: number;
    public readonly colour: string;
    public readonly spill:number;

    constructor(o?) {
        if (o == undefined) {
            this.label = "";
            this.iterations = this.period = this.setup = this.spill = 0;
            this.colour = "#000000";
        } else {
            this.label = o.label;
            this.imgNumber = o.imgNumber;
            this.iterations = o.iterations;
            this.period = o.period;
            this.setup = o.setup;
            this.colour = o.colour;
            this.spill = o.spill;
        }
    }

    static newInstance(label: string, imgNumber: number, period: number, setup: number, colour: string, spill: number) {
        let sdtc = new SDTimerConfig({
            label: label, imgNumber: imgNumber, 
            period: Math.floor(period),
            setup: Math.floor(setup),
            colour: colour, spill: spill
        });
        return sdtc;
    }

    equals(t: SDTimerConfig) {
        return (this.label == t.label && 
            this.imgNumber == t.imgNumber &&
            this.iterations == t.iterations &&
            this.period == t.period &&
            this.setup == t.setup &&
            this.colour == t.colour &&
            this.spill == t.spill);
    }

    getSpillAsString(): string {
        return "More than" + this.spill + "' tilt'";
    }
}
