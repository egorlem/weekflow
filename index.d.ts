declare module 'weekflow' {
    export function getWeekByDate(selectedDate: Date | string): number;
    
    export function getWeekRange(selectedDate: Date | string): {
        start: Date;
        end: Date;
    };
    
    export function getWeekInfo(selectedDate: Date | string): {
        weekNumber: number;
        start: Date;
        end: Date;
    };
}