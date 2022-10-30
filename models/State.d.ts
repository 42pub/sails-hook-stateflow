/** State instance */
export declare class State {
    /** StateName without  spaces */
    name: string;
    /** All states to possible to shift next */
    routes: string[];
    /** Array with validations */
    stateValidation: Function[];
    /** Array with current state callbacks */
    inState: Function[];
    /** Array with current state callbacks */
    beforeState: Function[];
    /** Array with afterstate callbacks */
    afterState: Function[];
    routeRules: Function[];
    /**
     *
     * @param name Name of State
     * @param routes Array of possible displacements
     * @param stateValidation Array with validations
     * @param inState Array with current state callbacks
     * @param afterState Array with afterstate callbacks
     */
    constructor(name: string, routes: string[], routeRules: Function, stateValidation: Function, beforeState: Function, inState: Function, afterState: Function);
    /** Add special route for current state */
    checkRoute(stateName: string): boolean;
    /** Add special route for current state */
    addRoute(stateName: string): boolean;
    /** Remove route for current state */
    removeRoute(stateName: string): boolean;
    runStateValidation(data: any): Promise<void>;
    runBeforeState(data: any): Promise<void>;
    runInState(data: any): Promise<void>;
    runAfterState(data: any): Promise<void>;
    getNextState(data: any): Promise<string>;
}
