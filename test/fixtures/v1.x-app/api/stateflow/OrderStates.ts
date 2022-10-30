module.exports = {
  ONE: {
    routeRules: async function (data, cb): Promise<string> {
      sails.stateflow_test = {}
      return "TEST_ROUTE_RULES";
    },
    stateValidation: async function (data: any, cb): Promise<void> {
      sails.stateflow_test.stateValidation = true
      cb();
      return
    },
    inState: async function (data, cb): Promise<void> {
      sails.stateflow_test.inState = true
      return;
    },
    afterState: async function (date, cb): Promise<void> {
      sails.stateflow_test.afterState = true
      return;
    },
  },
  TWO: {
    routeRules: async function (data, cb): Promise<string> {
      return "true";
    },
    stateValidation: async function (data, cb): Promise<void> {
      cb();
    },
    inState: async function (data, cb): Promise<void> {
      return;
    },
    afterState: async function (data, cb): Promise<void> {
      return;
    },
  },
  THREE: {
    routeRules: async function (data, cb): Promise<string> {
      return "true";
    },
    stateValidation: async function (data, cb): Promise<boolean> {
      return true;
    },
    inState: async function (data, cb): Promise<void> {
      return;
    },
    afterState: async function (data, cb): Promise<void> {
      return;
    },
  },
  FOUR: {
    routeRules: async function (data, cb): Promise<string> {
      return "true";
    },
    stateValidation: async function (data, cb): Promise<boolean> {
      return true;
    },
    inState: async function (data, cb): Promise<void> {
      return;
    },
    afterState: async function (data, cb): Promise<void> {
      return;
    },
  },
};
