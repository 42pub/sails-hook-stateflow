module.exports = {
  alpha: {
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
  beta: {
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
  gama: {
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
  zeta: {
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
