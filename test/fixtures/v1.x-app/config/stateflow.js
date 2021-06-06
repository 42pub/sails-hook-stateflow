module.exports.stateflow = {
  models: {
    /** If no model defined in sails.config.stateflow, hook use Order model */

    NotOrder: {
      /** Default state */
      stateField: "not_state",
      /** Create attribute ofwaterline model with required option. by default false */
      waterlineRequired: true,
      /** If not defined, call by default in sails.models[model].states() */
      states: {},
    },

    Order: {
      stateField: "state",
      waterlineRequired: false,
      states: {},
    },
  },
};
