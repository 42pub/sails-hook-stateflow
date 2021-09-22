module.exports.stateflow = {
    /** If no model defined in sails.config.stateflow, hook use Order model */
    Order: {
        /** Default state */
        stateField: "state",
        /** If not defined in config it get 0 item in states array */
        startState: "CART",
        /** Create attribute ofwaterline model with required option. by default false */
        waterlineRequired: false,
    }
};
