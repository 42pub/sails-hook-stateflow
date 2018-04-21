'use strict';

module.exports = function (sails) {
  return {
    defaults: require('./lib/defaults'),
    initialize: require('./lib/initializeModel')(sails)
  };
};

module.exports.State = require('./State');
