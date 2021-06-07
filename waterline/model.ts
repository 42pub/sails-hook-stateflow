import { State } from "../models/State";

let stateStart = "INIT";

module.exports = function(config) {
  return {
    stateflowModelConfig: config,
    states: {},
    next: async function (criteria: any, nextState? :any) {
      let modelInstanceData
      try {
        modelInstanceData = this.findOne(criteria)
      } catch (error) {
        sails.log.error(error)
      }
      let stateField: string = this.stateflowModelConfig.stateField;

      if (nextState && !sails.models[this.globalId.toLowerCase()].states[nextState]) 
        throw `state with name ${nextState} not present in ${this.globalId} model`

      if (nextState && !(await sails.models[this.globalId.toLowerCase()].states[modelInstanceData[stateField]].checkRoute(nextState)))
        throw `route for  ${nextState} don't preset in current state`

      if (!nextState)
        nextState = await sails.models[this.globalId.toLowerCase()].states[modelInstanceData[stateField]].getNextState(modelInstanceData)

      if (!nextState)
        throw "State for next not defined"
      
      try {
        await sails.models[this.globalId.toLowerCase()].states[nextState].runStateValidation(modelInstanceData)
      } catch (error) {
        throw `move to  ${nextState} ended with error: ${error}`
      }  

      await sails.models[this.globalId.toLowerCase()].states[modelInstanceData[stateField]].runAfterState(modelInstanceData)
            
      let update = {}
      update[stateField] = nextState;
      modelInstanceData = (await this.update({criteria},update).fetch())[0]
      await sails.models[this.globalId.toLowerCase()].states[modelInstanceData[stateField]].runAfterState(modelInstanceData)
    },
    getState: function (criteria: any) {
      let modelInstanceData
      try {
        modelInstanceData = this.findOne(criteria)
      } catch (error) {
        sails.log.error(error)
      }
      let stateField: string = this.stateflowModelConfig.stateField;
      return modelInstanceData[stateField];
    },
  
    getStateObject: function (criteria: any) {
      let modelInstanceData
      try {
        modelInstanceData = this.findOne(criteria)
      } catch (error) {
        sails.log.error(error)
      }

      return this.states[modelInstanceData[stateField]];
    },
  
    /** Add state in current model */
    addState: function (state: string, routes: string[], 
      routeRules: void,
      stateValidation: void,
      inState: void,
      afterState: void
      ) {
      

      if(sails.models[this.globalId.toLowerCase()].states[state]) 
        throw `State with name: ${state} present in model`
      
      let newState: State;
      try {
        newState = new State(
          state,
          routes,
          routeRules,
          stateValidation,
          inState,
          afterState
        );        
      } catch (error) {
        
      }

      sails.models[this.globalId.toLowerCase()].states[state] = newState
      return true;
    },
  
    /** Remove state from current model */
    removeState: function (stateField: string) {
      throw "Just delete prop";
    }
  }
};
