'use strict';

module.exports = function (sails) {
  return {
    initialize: cb => {
      require('./lib/initializeModel')(sails, cb);
      return cb();
    }
  };
};
