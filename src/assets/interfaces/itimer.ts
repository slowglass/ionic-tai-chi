export interface ITimer {
    label: string;
    setup: {
        seconds: number,
        repeat: boolean 
    };
    iterations: number;
    duration: { 
        minutes: number;
        seconds: number;
    };
}