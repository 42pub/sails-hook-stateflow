module.exports = {
  alpha: {
    routeRules: async function (): Promise<string> {
      return "true";
    },
    beforStateValidation: async function (): Promise<boolean> {
      return true;
    },
    inState: async function (): Promise<void> {
      return;
    },
    afterState: async function (): Promise<void> {
      return;
    },
  },
  beta: {
    routeRules: async function (): Promise<string> {
      return "true";
    },
    beforStateValidation: async function (): Promise<boolean> {
      return true;
    },
    inState: async function (): Promise<void> {
      return;
    },
    afterState: async function (): Promise<void> {
      return;
    },
  },
  gama: {
    routeRules: async function (): Promise<string> {
      return "true";
    },
    beforStateValidation: async function (): Promise<boolean> {
      return true;
    },
    inState: async function (): Promise<void> {
      return;
    },
    afterState: async function (): Promise<void> {
      return;
    },
  },
  zeta: {
    routeRules: async function (): Promise<string> {
      return "true";
    },
    beforStateValidation: async function (): Promise<boolean> {
      return true;
    },
    inState: async function (): Promise<void> {
      return;
    },
    afterState: async function (): Promise<void> {
      return;
    },
  },
};
