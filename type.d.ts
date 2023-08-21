type DateProps = {
    date: string;
    view: {
        type: string;
        dateEnv: {
            timeZone: string;
            canComputeOffset: boolean;
            calendarSystem: object;
            locale: {
                codeArg: string;
                codes: string[];
                week: {
                    dow: number;
                    doy: number;
                };
                simpleNumberFormat: object;
                options: {
                    direction: string;
                    buttonText: {
                        prev: string;
                        next: string;
                        prevYear: string;
                        nextYear: string;
                        year: string;
                        today: string;
                        month: string;
                        week: string;
                        day: string;
                        list: string;
                    };
                    weekText: string;
                    weekTextLong: string;
                    closeHint: string;
                    timeHint: string;
                    eventHint: string;
                    allDayText: string;
                    moreLinkText: string;
                    noEventsText: string;
                    buttonHints: {
                        prev: string;
                        next: string;
                    };
                    viewHint: string;
                    navLinkHint: string;
                };
            };
            weekDow: number;
            weekDoy: number;
            weekText: string;
            weekTextLong: string;
            cmdFormatter: null;
            defaultSeparator: string;
        };
    };
    dow: number;
    isDisabled: boolean;
    isOther: boolean;
    isToday: boolean;
    isPast: boolean;
    isFuture: boolean;
    isMonthStart?: boolean;
    dayNumberText: string;
    el: object;

};