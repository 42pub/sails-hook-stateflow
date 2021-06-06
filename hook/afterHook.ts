import _ = require('lodash');
const Model = require('../waterline/model');

export default async function (sails: any) {
  try {
    const conf = sails.config.stateflow;
    Object.keys(conf.models).forEach((modelName) => {

        let modelname = modelName.toLowerCase();


        
        let stateField = conf.models[modelName].stateField || "state";
        let waterlineRequired = conf.models[modelName].waterlineRequired || false
        sails.models[modelname].attributes[stateField] = {
          type: "string",
          required: waterlineRequired
        }
        
        let model = new Model({...conf.models[modelName], model: modelname})
        _.merge(sails.models[modelname], model);

        let states: {} = conf.models[modelName].states;     
        if (states){
          sails.models[modelname].states = states
        }
    }
  } catch (e) {
    sails.log.error("StateFlow > afterHook > LoadError", e);
    // Here exit becuase StateFlow is very important ;) 
    process.exit(1);
  }
}
