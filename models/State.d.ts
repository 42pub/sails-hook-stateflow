/** State instance */
export declare class State {
    /** StateName without  spaces */
    name: string;
    /** All states to possible to shift next */
    routes: string[];
    /** Array with validations */
    stateValidation: ((data: object, cb: (a: string) => void) => void)[];
    /** Array with current state callbacks */
    inState: ((data: object, cb: (a: string) => void) => void)[];
    /** Array with afterstate callbacks */
    afterState: ((data: object, cb: (a: string) => void) => void)[];
    routeRules: ((data: object, route: (a: string) => void) => void)[];
    /**
     *
     * @param name Name of State
     * @param routes Array of possible displacements
     * @param stateValidation Array with validations
     * @param inState Array with current state callbacks
     * @param afterState Array with afterstate callbacks
     */
    constructor(name: string, routes: string[], routeRules: void, stateValidation: void, inState: void, afterState: void);
    /** Add special route for current state */
    checkRoute(stateName: string): boolean;
    /** Add special route for current state */
    addRoute(stateName: string): boolean;
    /** Remove route for current state */
    removeRoute(stateName: string): boolean;
    runStateValidation(data: any): Promise<void>;
    runInState(data: any): Promise<void>;
    runAfterState(data: any): Promise<void>;
    getNextState(data: any): Promise<string>;
}
