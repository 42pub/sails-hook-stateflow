const _ = require('lodash');

module.exports = function initializeModel(sails) {
  /**
   * Merge models like inheritance
   */
  return function (cb) {
    const conf = sails.config.stateflow;
    const Order = require('../api/models/Order');
    Order.attributes[conf.stateField] = {
      type: 'string'
    };
    Order.attributes[conf.stateField + '_list'] = {
      type: 'array'
    };
    _.merge(sails.models[conf.model.toLowerCase()], Order);
    return cb();
  };
};
