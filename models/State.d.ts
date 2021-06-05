/** State instance */
export declare class State {
    /** StateName without  spaces */
    name: string;
    /** All states to possible to shift next */
    next: string[];
    /** valid */
    valid: void;
    constructor(opts: string, next: string[], valid: void);
    /** Add route for current state */
    addRoute(nextName: string): boolean;
    /** remove route for current state */
    removeRoute(nextName: string): boolean;
}
