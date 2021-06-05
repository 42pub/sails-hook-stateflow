declare class State {
    constructor(opts: any, next: any, valid: any);
    addRoute(nextName: any): boolean;
    removeRoute(nextName: any): boolean;
}
