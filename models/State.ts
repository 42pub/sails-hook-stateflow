import sails from "typed-sails";

/** State instance */
export class State {
  /** StateName without  spaces */
  name: string;

  /** All states to possible to shift next */
  routes: string[];

  /** Array with validations */
  stateValidation: ((data: object, cb:(a: string) => void) => void)[] = [];

  /** Array with current state callbacks */
  inState: void[] = [];

  /** Array with afterstate callbacks */
  afterState: void[] = [];

  routeRules: void[] = [];
  /**
   *
   * @param name Name of State
   * @param routes Array of possible displacements
   * @param stateValidation Array with validations
   * @param inState Array with current state callbacks
   * @param afterState Array with afterstate callbacks
   */
  constructor(
    name: string,
    routes: string[],
    routeRules: void,
    stateValidation: void,
    inState: void,
    afterState: void
  ) {
    if (!name || !routes) throw "name & routes arguments required";
    this.name = name;
    this.routes = routes;

    if (stateValidation !== undefined) this.stateValidation.push(stateValidation);
    if (inState !== undefined) this.inState.push(inState);
    if (afterState !== undefined) this.afterState.push(afterState);
    if (routeRules !== undefined) this.routeRules.push(routeRules);
  }

  /** Add special route for current state */
  checkRoute(stateName: string) {
    if (!stateName || typeof stateName !== "string") throw "stateName required";
    if (this.routes.indexOf(stateName) >= 0){
      return true;
    } else {
      return false;
    } 
  }


  /** Add special route for current state */
  addRoute(stateName: string) {
    if (!stateName || typeof stateName !== "string") throw "stateName required";
    if (this.routes.indexOf(stateName) >= 0) return false;
    this.routes.push(stateName);
    return true;
  }

  /** Remove route for current state */
  removeRoute(stateName: string) {
    if (!stateName || typeof stateName !== "string") throw "stateName required";
    const ind = this.routes.indexOf(stateName);
    if (ind < 0) return false;
    this.routes.splice(ind, 1);
    return true;
  }

  async runStateValidation(data: any){
    let error: string;
    for await(let layerstateValidation of this.stateValidation) {
      await layerstateValidation(data, (e) => {
        if (e) error = e;
      })
      if(error) break;
    }
    if (error) throw error
  } 

  async runInState(data: any){
    let error: string;
    for await (let layerRunInState of this.stateValidation) {
      await layerRunInState(data, (e) => {
        if (e) error = e;
      })
      if(error) break;
    }
    if (error) throw error
  }

  async runAfterState(data: any){
    let error: string;
    for await(let layerRunAfterState of this.stateValidation) {
      await layerRunAfterState(data, (e) => {
        if (e) error = e;
      })
      if(error) break;
    }
    if (error) throw error
  }

  async getNextState(data: any){
    let nextState: string;
    
    if (this.routes.length === 1) {
      return this.routes[0]
    }

    for await(let layerRunAfterState of this.stateValidation) {
      await layerRunAfterState(data, (ns) => {
        if (ns) nextState = ns;
      })
      if(nextState) break;
    }
    if (nextState) throw nextState
  }

}
