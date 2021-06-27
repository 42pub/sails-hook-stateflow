"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const State_1 = require("../models/State");
let stateStart = "INIT";
module.exports = function (config) {
    return {
        stateflowModelConfig: config,
        states: {},
        next: async function (criteria, nextState) {
            let modelInstanceData;
            let modelname = this.globalId.toLowerCase();
            try {
                modelInstanceData = await this.findOne(criteria);
            }
            catch (error) {
                sails.log.error(error);
            }
            let stateField = this.stateflowModelConfig.stateField;
            if (!nextState)
                nextState = await sails.models[modelname].state[modelInstanceData[stateField]].getNextState(modelInstanceData);
            if (!nextState)
                throw "State for next not defined";
            if (nextState && !sails.models[modelname].state[nextState])
                throw `state with name ${nextState} not present in ${this.globalId} model`;
            if (nextState &&
                !(await sails.models[modelname].state[modelInstanceData[stateField]].checkRoute(nextState)))
                throw `route for  ${nextState} don't preset in current state`;
            if (sails.models[modelname].state[nextState] === undefined)
                throw `State with name ${nextState} not found`;
            try {
                await sails.models[modelname].state[nextState].runStateValidation(modelInstanceData);
            }
            catch (error) {
                sails.log.debug(`StateFlow next() > runStateValidation error: ${error}`);
                throw `runStateValidation to ${nextState} ended with error: ${error}`;
            }
            try {
                await sails.models[modelname].state[modelInstanceData[stateField]].runAfterState(modelInstanceData);
            }
            catch (error) {
                sails.log.debug(`StateFlow next() > runAfterState error: ${error}`);
                throw `runAfterState in ${modelInstanceData[stateField]} ended with error: ${error}`;
            }
            /**
             * нужно сначало сохранять потомучто внутри одного next может быть другой.
             */
            let update = {};
            update[stateField] = nextState;
            modelInstanceData = (await this.update(criteria, update).fetch())[0];
            try {
                await sails.models[modelname].state[nextState].runInState(modelInstanceData);
            }
            catch (error) {
                sails.log.debug(`StateFlow next() > runInState error: ${error}`);
                throw `instate in ${nextState} ended with error: ${error}`;
            }
        },
        getState: async function (criteria) {
            let modelInstanceData;
            try {
                modelInstanceData = await this.findOne(criteria);
            }
            catch (error) {
                sails.log.error(error);
            }
            let stateField = this.stateflowModelConfig.stateField;
            return modelInstanceData[stateField];
        },
        getStateObject: async function (criteria) {
            let modelInstanceData;
            try {
                modelInstanceData = await this.findOne(criteria);
            }
            catch (error) {
                sails.log.error(error);
            }
            let stateField = this.stateflowModelConfig.stateField;
            return this.state[modelInstanceData[stateField]];
        },
        /** Add state in current model */
        addState: function (state, routes, routeRules, stateValidation, inState, afterState) {
            if (sails.models[this.globalId.toLowerCase()].state[state])
                throw `State with name: ${state} present in model`;
            let newState;
            try {
                newState = new State_1.State(state, routes, routeRules, stateValidation, inState, afterState);
            }
            catch (error) { }
            sails.models[this.globalId.toLowerCase()].state[state] = newState;
            return true;
        },
        /** Remove state from current model */
        removeState: function (stateField) {
            throw "Just delete prop";
        },
    };
};
