const State = require('sails-hook-stateflow').State;

module.exports.stateflow = {
  models: {
    /** If no model defined in sails.config.stateflow, hook use Order model */

    NotOrder: {
      /** Default state */
      stateField: "not_state",
      /** Create attribute ofwaterline model with required option. by default false */
      waterlineRequired: true,
      /** If not defined, call by default in sails.models[model].states() */
      
      states: [
        new State('CART', ['CHECKOUT'], function (cb) {
          cb(null, true);
        }),
        new State('CHECKOUT', ['ORDER', 'PAYMENT', 'CART'], function (cb) {
          cb(null, true);
        }),
        new State('PAYMENT', ['ORDER', 'CHECKOUT'], function (cb) {
          /**
           * PAYMENT -> ORDER при успешной оплате.
           * PAYMENT -> CHECKOUT при неуспешной оплате
           */
          cb(null, true);
        }),
        new State('ORDER', [], function (cb) {
          cb(null, true);
        })
      ]
    },

    Order: {
      stateField: "state",
      waterlineRequired: false,
      states: {},
    },
  },
};
