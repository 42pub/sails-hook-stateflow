
module.exports.stateflow = {
  models: {
    /** If no model defined in sails.config.stateflow, hook use Order model */

    NotOrder: {
      /** Default state */
      stateField: "not_state",
      /** Create attribute ofwaterline model with required option. by default false */
      waterlineRequired: true,
      /** If not defined, exit */


      states: {
        alpha: ["beta"],
        beta: ["gama"],
        gama: ["zeta"],
        zeta: ["alpha"],
      },
    },

    Order: {
      startState: "ONE",
      states: {
        ONE: ["TWO"],
        TWO: ["THREE", "FOUR"],
        TRHEE: ["ONE", "FOUR"],
        FOUR: [],
      },
    },
  },
};
