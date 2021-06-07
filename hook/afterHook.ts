import _ = require("lodash");
const Model = require("../waterline/model");
import { State } from "../models/State";
import path = require("path");
import fs = require("fs");

export default async function (sails: any) {
  try {
    const conf = sails.config.stateflow;
    Object.keys(conf.models).forEach((modelName) => {
      let modelname = modelName.toLowerCase();
      let modelConf = conf.models[modelName]
      let stateField = modelConf.stateField || "state";
      let waterlineRequired = modelConf.waterlineRequired || false;
      let startState;
  
      if(modelConf.waterlineRequired && modelConf.startState !== undefined)
        throw `waterlineRequired & startState not allowed for combine`

      if(modelConf.startState && !modelConf.states[modelConf.startState])
        throw `Start state ${modelConf.startState} for model ${modelName} not present in states list`

      if(!modelConf.startState && !waterlineRequired && modelConf.states)
        modelConf.startState = modelConf.states[Object.keys(modelConf.states)[0]]

      let field = {
          type: "string",
          required: waterlineRequired,
      };

      if(!waterlineRequired)
        field.defaultsTo = modelConf.startState

      sails.models[modelname].attributes[stateField] = field

      let model = new Model({ ...modelConf, model: modelname });
      _.merge(sails.models[modelname], model);

      let states: {} = modelConf.states;
      if (states) {
        sails.models[modelname].states = {};
        Object.keys(states).forEach((state) => {
          let statesApiPath = path.resolve(
            process.cwd(),
            "api/stateflow/",
            sails.models[modelname].globalId + "States.js"
          );
          let statesApi: string;
          let routeRules: void,
            stateValidation: void,
            inState: void,
            afterState: void;

          if (fs.existsSync(statesApiPath)) {
            statesApi = require(statesApiPath);
            if (statesApi[state]) {
              if (statesApi[state].routeRules)
                routeRules = statesApi[state].routeRules;
              if (statesApi[state].stateValidation)
                stateValidation = statesApi[state].stateValidation;
              if (statesApi[state].inState) inState = statesApi[state].inState;
              if (statesApi[state].afterState)
                afterState = statesApi[state].afterState;
            }
          }

          sails.models[modelname].states[state] = new State(
            state,
            states[state],
            routeRules,
            stateValidation,
            inState,
            afterState
          );
        });
      }
    });
  } catch (e) {
    sails.log.error("StateFlow > afterHook > LoadError", e);
    // Here exit becuase StateFlow is very important ;)
    process.exit(1);
  }
}
