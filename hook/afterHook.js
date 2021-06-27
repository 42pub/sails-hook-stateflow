"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const Model = require("../waterline/model");
const State_1 = require("../models/State");
const path = require("path");
const fs = require("fs");
async function default_1(sails) {
    try {
        const conf = sails.config.stateflow;
        Object.keys(conf.models).forEach((modelName) => {
            let modelname = modelName.toLowerCase();
            let modelConf = conf.models[modelName];
            let stateField;
            modelConf.stateField = stateField = modelConf.stateField || "state";
            let waterlineRequired = modelConf.waterlineRequired || false;
            /** Config without startState  (circle flows) */
            if (modelConf.waterlineRequired && modelConf.startState !== undefined)
                throw `waterlineRequired & startState not allowed for combine`;
            /** Config with startState defined */
            if (modelConf.startState && !modelConf.states[modelConf.startState])
                throw `Start state ${modelConf.startState} for model ${modelName} not present in states list`;
            if (!modelConf.startState && !waterlineRequired && modelConf.states)
                modelConf.startState = modelConf.states[Object.keys(modelConf.states)[0]];
            let field = {
                type: "string",
                required: waterlineRequired,
                /**
                 * This not accesed add state in runtime
                 * but this need implement
                 * */
                // TODO: Add isIn In runtime
                //isIn: Object.keys(modelConf.states)
            };
            if (!waterlineRequired)
                field.defaultsTo = modelConf.startState;
            sails.models[modelname].attributes[stateField] = field;
            let model = new Model({ ...modelConf, model: modelname });
            _.merge(sails.models[modelname], model);
            let states = modelConf.states;
            if (states) {
                sails.models[modelname].state = {};
                Object.keys(states).forEach((state) => {
                    let statesApiPath = path.resolve(process.cwd(), "api/stateflow/", sails.models[modelname].globalId + "States.js");
                    let statesApi;
                    let routeRules, stateValidation, inState, afterState;
                    if (fs.existsSync(statesApiPath)) {
                        statesApi = require(statesApiPath);
                        if (statesApi[state]) {
                            if (statesApi[state].routeRules)
                                routeRules = statesApi[state].routeRules;
                            if (statesApi[state].stateValidation)
                                stateValidation = statesApi[state].stateValidation;
                            if (statesApi[state].inState)
                                inState = statesApi[state].inState;
                            if (statesApi[state].afterState)
                                afterState = statesApi[state].afterState;
                        }
                        sails.log.verbose(`StateFlow > state (${state}) loaded from ${statesApiPath}, for\n routeRules: ${typeof (routeRules)},\n stateValidation: ${typeof (stateValidation)},\n inState: ${typeof (inState)}\n afterState: ${typeof (afterState)}`);
                    }
                    sails.models[modelname].state[state] = new State_1.State(state, states[state], routeRules, stateValidation, inState, afterState);
                });
                /** Нужно сделать проверку чтобы нельзя было записать новую звпись в БД с отличным от старСтейт состоянием   */
                /** Tick runInState when create model instance */
                let afterCreate = sails.models[modelname].afterCreate !== undefined ? sails.models[modelname].afterCreate : undefined; // ??
                sails.models[modelname].afterCreate = async function (values, cb) {
                    let state = values.state ? values.state : modelConf.startState;
                    if (!state) {
                        throw "Start state is not defined";
                    }
                    console.log(state, sails.models[modelname].state);
                    sails.models[modelname].state[state].runInState(values);
                    if (afterCreate) {
                        afterCreate(values, cb);
                    }
                    else {
                        cb();
                    }
                };
            }
        });
    }
    catch (e) {
        sails.log.error("StateFlow > afterHook > LoadError", e);
        // Here exit becuase StateFlow is very important ;)
        process.exit(1);
    }
}
exports.default = default_1;
