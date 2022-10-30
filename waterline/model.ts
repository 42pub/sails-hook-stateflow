import { State } from "../models/State";

let stateStart = "INIT";

module.exports = function (config) {
  return {
    stateflowModelConfig: config,
    states: {},
    next: async function (criteria: any, nextState?: any) {
      let modelInstanceData;
      let modelname = this.globalId.toLowerCase();
      try {
        modelInstanceData = await this.findOne(criteria);
      } catch (error) {
        sails.log.error(error);
      }
      let stateField: string = this.stateflowModelConfig.stateField;
      let currenState: string = modelInstanceData[stateField];
      
      if (currenState === nextState)
        return;

      if (!nextState)
        nextState = await sails.models[modelname].state[
          modelInstanceData[stateField]
        ].getNextState(modelInstanceData);

      if (!nextState) throw "State for next not defined";

      if (nextState && !sails.models[modelname].state[nextState])
        throw `state with name ${nextState} not present in ${this.globalId} model`;

        console.log(stateField, nextState)


      if (
        nextState &&
        !(await sails.models[modelname].state[
          modelInstanceData[stateField]
        ].checkRoute(nextState))
      )
        throw `route for  ${nextState} don't preset in current state: ${currenState}`;

      if (sails.models[modelname].state[nextState] === undefined)
        throw `State with name ${nextState} not found`;

      try {
        await sails.models[modelname].state[nextState].runStateValidation(
          modelInstanceData
        );
      } catch (error) {
        sails.log.debug(
          `StateFlow next() > runStateValidation error: ${error}`
        );
        throw `runStateValidation to ${nextState} ended with error: ${error}`;
      }


      /** Если на beforeState будет next внутри, то будет плохо */
      try {
        await sails.models[modelname].state[nextState].runBeforeState(
          modelInstanceData
        );
      } catch (error) {
        sails.log.debug(`StateFlow next() > beforeState error: ${error}`);
        throw `beforeState in ${nextState} ended with error: ${error}`;
      }

      /**
       * нужно сначало сохранять потомучто внутри одного next может быть другой.
       */
      let update = {};
      update[stateField] = nextState;
      modelInstanceData = (await this.update(criteria, update).fetch())[0];

      try {
        await sails.models[modelname].state[nextState].runInState(
          modelInstanceData
        );
      } catch (error) {
        sails.log.debug(`StateFlow next() > runInState error: ${error}`);
        throw `instate in ${nextState} ended with error: ${error}`;
      }

      try {
        await sails.models[modelname].state[
          currenState
        ].runAfterState(modelInstanceData);
      } catch (error) {
        sails.log.debug(`StateFlow next() > runAfterState error: ${error}`);
        throw `runAfterState in ${modelInstanceData[stateField]} ended with error: ${error}`;
      }


    },
    getState: async function (criteria: any) {
      let modelInstanceData;
      try {
        modelInstanceData = await this.findOne(criteria);
      } catch (error) {
        sails.log.error(error);
      }
      let stateField: string = this.stateflowModelConfig.stateField;
      return modelInstanceData[stateField];
    },

    getStateObject: async function (criteria: any) {
      let modelInstanceData;
      try {
        modelInstanceData = await this.findOne(criteria);
      } catch (error) {
        sails.log.error(error);
      }
      let stateField: string = this.stateflowModelConfig.stateField;

      return this.state[modelInstanceData[stateField]];
    },

    /** Add state in current model */
    addState: function (
      state: string,
      routes: string[],
      routeRules: Function,
      stateValidation: Function,
      beforeState: Function,
      inState: Function,
      afterState: Function
    ) {
      if (sails.models[this.globalId.toLowerCase()].state[state])
        throw `State with name: ${state} present in model`;

      let newState: State;
      try {
        newState = new State(
          state,
          routes,
          routeRules,
          stateValidation,
          beforeState,
          inState,
          afterState
        );
      } catch (error) {}

      sails.models[this.globalId.toLowerCase()].state[state] = newState;
      return true;
    },

    /** Remove state from current model */
    removeState: function (stateField: string) {
      throw "Just delete prop";
    },
  };
};
