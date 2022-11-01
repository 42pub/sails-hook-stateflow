
/** State instance */
export class State {
  /** StateName without  spaces */
  name: string;

  /** All states to possible to shift next */
  routes: string[] = [];

  /** Array with validations */
  stateValidation: Function[] = [];

  /** Array with current state callbacks */
  inState:  Function[] = [];

  /** Array with current state callbacks */
  beforeState:  Function[] = [];

  /** Array with afterstate callbacks */
  afterState: Function[] = [];

  routeRules: Function[] = [];
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
    routeRules: Function,
    stateValidation: Function,
    beforeState: Function,
    inState: Function,
    afterState: Function
  ) {
    if (!name || !routes) throw "name & routes arguments required";
    this.name = name;
    this.routes = routes;

    if (stateValidation !== undefined) this.stateValidation.push(stateValidation);
    if (inState !== undefined) this.inState.push(inState);
    if (afterState !== undefined) this.afterState.push(afterState);
    if (routeRules !== undefined) this.routeRules.push(routeRules);
    if (beforeState !== undefined) this.beforeState.push(beforeState);
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

  async runBeforeState(data: any){
    let error: string;
    for await (let layerRunBeforeState of this.beforeState) {
      await layerRunBeforeState(data, (e) => {
        if (e) error = e;
      })
      if(error) break;
    }
    if (error) throw error
  }

  async runInState(data: any){
    let error: string;
    for await (let layerRunInState of this.inState) {
      await layerRunInState(data, (e) => {
        if (e) error = e;
      })
      if(error) break;
    }
    if (error) throw error
  }

  async runAfterState(data: any){
    let error: string;
    for await(let layerRunAfterState of this.afterState) {
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

    for await(let layerRunAfterState of this.routeRules) {
      await layerRunAfterState(data, (ns) => {
        if (ns) nextState = ns;
      })
      if(nextState) break;
    }
    if (nextState) return nextState
  }

}
