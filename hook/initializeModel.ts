import _ = require('lodash');
import { Sails } from 'typed-sails';

module.exports = function initializeModel(sails: Sails) {
    /**
     * Merge models like inheritance
     */
    return function (cb: () => void) {
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
