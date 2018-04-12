const _ = require('lodash');

module.exports = function initializeModel(sails, cb) {
  /**
   * Megre models like inheritance
   */
  const Order = require('../api/models/Order');
  _.merge(sails.models[sails.config.stateflow.model.toLowerCase()], Order);
};
