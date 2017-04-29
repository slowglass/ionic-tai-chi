
export class Utils {
    static getLogo(imgNo: number): string { return "assets/img/stance" + (imgNo % 8) + ".png"; }
    static getDuration(secs: number): any { return { minutes: Math.floor(secs / 60), seconds: (secs % 60) }; }
    static getTimeAsString(mins: number, secs: number) {
        let s: string = "";
        if (mins < 10) s += '0';
        s += mins.toString();
        s += ":";
        if (secs < 10) s += '0';
        s += secs.toString();
        return s;
    }

    static getDurationAsString(secs: number) {
        let d = Utils.getDuration(secs);
        return Utils.getTimeAsString(d.minutes, d.seconds); 
    }

    static fixed(n: number): string {
        return (n==null) ? "" : "" + (n.toFixed(2));
    }
}