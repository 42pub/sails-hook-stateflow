"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
async function default_1(sails) {
    try {
        const conf = sails.config.stateflow;
        const model = require('../waterline/model');
        console.log(conf);
        sails.models[conf.model.toLowerCase()].attributes[conf.stateField] = {
            type: "string",
            required: false
        };
        _.merge(sails.models[conf.model.toLowerCase()], model);
    }
    catch (e) {
        sails.log.error("StateFlow > afterHook > LoadError", e);
        process.exit(1);
    }
}
exports.default = default_1;
