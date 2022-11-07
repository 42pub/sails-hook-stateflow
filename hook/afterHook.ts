import _ = require("lodash");
const Model = require("../waterline/model");
import { State } from "../models/State";
import path = require("path");
import fs = require("fs");

export default async function (sails: any) {
  try {
    const conf = sails.config.stateflow;
    
    if (!conf.models) return sails.log.info("StateFlow >> models not found in stateflow config") 
 
    Object.keys(conf.models).forEach((modelName) => {
      let modelname = modelName.toLowerCase();
      let modelConf = conf.models[modelName]
      
      let stateField
      modelConf.stateField = stateField = modelConf.stateField || "state";
      
      let waterlineRequired = modelConf.waterlineRequired || false;
      
      /** Config without startState  (circle flows) */
      if(modelConf.waterlineRequired && modelConf.startState !== undefined)
        throw `waterlineRequired & startState not allowed for combine`

      /** Config with startState defined */
      if(modelConf.startState && !modelConf.states[modelConf.startState])
        throw `Start state ${modelConf.startState} for model ${modelName} not present in states list`

      if(!modelConf.startState && !waterlineRequired && modelConf.states)
        modelConf.startState = modelConf.states[Object.keys(modelConf.states)[0]]

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

      // Sails1x no support defaultTo 
      // TODO: rewrite to set defaultsTo in beforeCreate
      if(!waterlineRequired)
        //@ts-ignore
        field.defaultsTo = modelConf.startState

      sails.models[modelname].attributes[stateField] = field

      let model = new Model({ ...modelConf, model: modelname });
      _.merge(sails.models[modelname], model);

      let states: {} = modelConf.states;
      if (states) {
        sails.models[modelname].state = {};
        Object.keys(states).forEach((state) => {
          let flowFile
          // First check config flowFile
          if (modelConf.flowFile && fs.existsSync(modelConf.flowFile)){
            flowFile = modelConf.flowFile
          } else {
            flowFile = path.resolve(
              process.cwd(),
              "api/stateflow/",
              sails.models[modelname].globalId + "States.js"
            );
          }

          let statesApi: string;
          let routeRules: Function;
          let stateValidation: Function;
          let inState: Function;
          let afterState: Function;
          let beforeState: Function;

          if (fs.existsSync(flowFile)) {
            statesApi = require(flowFile);
            if (statesApi[state]) {
              if (statesApi[state].routeRules)
                routeRules = statesApi[state].routeRules;
              if (statesApi[state].stateValidation)
                stateValidation = statesApi[state].stateValidation;
              
              if (statesApi[state].beforeState) beforeState = statesApi[state].beforeState;
              if (statesApi[state].inState) inState = statesApi[state].inState;
              if (statesApi[state].afterState)
                afterState = statesApi[state].afterState;
            }
            sails.log.silly(`StateFlow > state (${state}) loaded from ${flowFile}, for\n routeRules: ${typeof(routeRules)},\n stateValidation: ${typeof(stateValidation)},\n inState: ${typeof(inState)}\n afterState: ${typeof(afterState)}`)
          }

          sails.models[modelname].state[state] = new State(
            state,
            states[state],
            routeRules,
            stateValidation,
            beforeState,
            inState,
            afterState
          );
        });

        /** Нужно сделать проверку чтобы нельзя было записать новую звпись в БД с отличным от старСтейт состоянием   */

        /** Tick runInState when create model instance */ 

        let afterCreate = sails.models[modelname].afterCreate !== undefined ? sails.models[modelname].afterCreate : undefined; // ??
        
        sails.models[modelname].afterCreate = async function (values, cb ) {
          let state = values.state ? values.state : modelConf.startState;
          if (state === "") state = modelConf.startState
          if (!state){
            throw "Start state is not defined"
          }
          //console.log(state, sails.models[modelname].state);
          sails.models[modelname].state[state].runInState(values);
          if (afterCreate) {
            afterCreate(values, cb);
          } else {
            cb();
          }
        };


      }
    });
  } catch (e) {
    sails.log.error("StateFlow > afterHook > LoadError", e);
    // Here exit becuase StateFlow is very important ;)
    process.exit(1);
  }
}
