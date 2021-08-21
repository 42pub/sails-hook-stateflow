'use strict';

module.exports = function (sails) {
    return {
        defaults: require('./hook/defaults'),
        initialize: require('./hook/initialize').default(sails)
    };
};

module.exports.State = require('./models/State');