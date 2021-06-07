import { State } from "../models/State";

let stateStart = "INIT";

module.exports = function(config) {
  return {
    stateflowModelConfig: config,
    states: {},
    next: function (criteria: any, nextState? :any) {
      let modelInstanceData
      try {
        modelInstanceData = this.findOne(criteria)
      } catch (error) {
        sails.log.error(error)
      }
      let stateField: string = this.stateflowModelConfig.stateField;

      return new Promise((resolve, reject) => {
        /** Если куда перемещатся не передано: 
         *  Проверяет если следующий роут всего один то перемещается на него,
         *  Если следующего роута нету, то выдает ошибку
         * */
        
      });
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
      beforStateValidation: void,
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
          beforStateValidation,
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
