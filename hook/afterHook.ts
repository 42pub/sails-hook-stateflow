import _ = require('lodash');
const Model = require('../waterline/model');

export default async function (sails: any) {
  try {

    const conf = sails.config.stateflow;
    
let i = 120;
    Object.keys(conf.models).forEach((modelName) => {
      i = i +300
      setTimeout(() => {
        let modelname = modelName.toLowerCase();
        sails.models[modelname].attributes[conf.models[modelName].stateField] = {
          type: "string",
          required: conf.models[modelName].required || false
        }

        let model = new Model({...conf.models[modelName], model: modelname})
        _.merge(sails.models[modelname], model);        
      }, i);
    }

    
  } catch (e) {
    sails.log.error("StateFlow > afterHook > LoadError", e);
    process.exit(1);
  }
}
