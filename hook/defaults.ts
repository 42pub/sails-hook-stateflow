module.exports = {
    /** If no model defined in sails.config.stateflow, hook use Order model */
    Order: {
      /** Default state */
      stateField: "state",
      /** Create attribute ofwaterline model with required option. by default false */
      waterlineRequired: false,
      /** If not defined, call by default in sails.models[model].states() */
      states: {}
    }
  };