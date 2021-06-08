module.exports = {
    ONE: {
        routeRules: async function (data, cb) {
            sails.stateflow_test = {};
            return "TEST_ROUTE_RULES";
        },
        stateValidation: async function (data, cb) {
            sails.stateflow_test.stateValidation = true;
            cb();
        },
        inState: async function (data, cb) {
            sails.stateflow_test.inState = true;
            return;
        },
        afterState: async function (date, cb) {
            sails.stateflow_test.afterState = true;
            return;
        },
    },
    TWO: {
        routeRules: async function (data, cb) {
            return "true";
        },
        stateValidation: async function (data, cb) {
            cb();
        },
        inState: async function (data, cb) {
            return;
        },
        afterState: async function (data, cb) {
            return;
        },
    },
    THREE: {
        routeRules: async function (data, cb) {
            return "true";
        },
        stateValidation: async function (data, cb) {
            return true;
        },
        inState: async function (data, cb) {
            return;
        },
        afterState: async function (data, cb) {
            return;
        },
    },
    FOUR: {
        routeRules: async function (data, cb) {
            return "true";
        },
        stateValidation: async function (data, cb) {
            return true;
        },
        inState: async function (data, cb) {
            return;
        },
        afterState: async function (data, cb) {
            return;
        },
    },
};
