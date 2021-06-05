"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
module.exports = function initializeModel(sails) {
    /**
     * Merge models like inheritance
     */
    return function (cb) {
        //@ts-ignore
        const conf = sails.config.stateflow;
        const model = require('../waterline/model');
        model.attributes[conf.stateField] = {
            type: 'string'
        };
        model.attributes.nameOfModel = {
            type: 'string'
        };
        _.merge(sails.models[conf.model.toLowerCase()], model);
        return cb();
    };
};
