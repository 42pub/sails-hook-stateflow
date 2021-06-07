import sails from "typed-sails";

/** State instance */
export class State {
  /** StateName without  spaces */
  name: string;

  /** All states to possible to shift next */
  routes: string[];

  /** Array with validations */
  beforStateValidation: ((data: object, cb:(a: string) => void) => void)[] = [];

  /** Array with current state callbacks */
  inState: void[] = [];

  /** Array with afterstate callbacks */
  afterState: void[] = [];

  routeRules: void[] = [];
  /**
   *
   * @param name Name of State
   * @param routes Array of possible displacements
   * @param beforStateValidation Array with validations
   * @param inState Array with current state callbacks
   * @param afterState Array with afterstate callbacks
   */
  constructor(
    name: string,
    routes: string[],
    routeRules: void,
    beforStateValidation: void,
    inState: void,
    afterState: void
  ) {
    if (!name || !routes) throw "name & routes arguments required";
    this.name = name;
    this.routes = routes;

    if (beforStateValidation !== undefined) this.beforStateValidation.push(beforStateValidation);
    if (inState !== undefined) this.beforStateValidation.push(inState);
    if (afterState !== undefined) this.beforStateValidation.push(afterState);
    if (routeRules !== undefined) this.routeRules.push(routeRules);
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

  async runBeforStateValidation(data: any){
    let error: string;
    for await(let layerBeforStateValidation of this.beforStateValidation) {
      await layerBeforStateValidation(data, (e) => {
        if (e) error = e;
      })
      if(error) break;
    }
    throw error;
  } 

  async runInState(data: any){
    let error: string;
    for await (let layerRunInState of this.beforStateValidation) {
      await layerRunInState(data, (e) => {
        if (e) error = e;
      })
      if(error) break;
    }
    throw error;
  }

  async runAfterState(data: any){
    let error: string;
    for await(let layerRunAfterState of this.beforStateValidation) {
      await layerRunAfterState(data, (e) => {
        if (e) error = e;
      })
      if(error) break;
    }
    throw error;
  }

  async runRouteRules(data: any){
    let nextState: string;
    for await(let layerRunAfterState of this.beforStateValidation) {
      await layerRunAfterState(data, (ns) => {
        if (ns) nextState = ns;
      })
      if(nextState) break;
    }
    throw nextState;
  }

}
