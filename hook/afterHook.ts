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

      let stateField = conf.models[modelName].stateField || "state";
      let waterlineRequired = conf.models[modelName].waterlineRequired || false;
      sails.models[modelname].attributes[stateField] = {
        type: "string",
        required: waterlineRequired,
      };

      let model = new Model({ ...conf.models[modelName], model: modelname });
      _.merge(sails.models[modelname], model);

      let states: {} = conf.models[modelName].states;
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
            beforStateValidation: void,
            inState: void,
            afterState: void;

          if (fs.existsSync(statesApiPath)) {
            statesApi = require(statesApiPath);
            if (statesApi[state]) {
              if (statesApi[state].routeRules)
                routeRules = statesApi[state].routeRules;
              if (statesApi[state].beforStateValidation)
                beforStateValidation = statesApi[state].beforStateValidation;
              if (statesApi[state].inState) inState = statesApi[state].inState;
              if (statesApi[state].afterState)
                afterState = statesApi[state].afterState;
            }
          }

          sails.models[modelname].states[state] = new State(
            state,
            states[state],
            routeRules,
            beforStateValidation,
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
