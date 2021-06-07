module.exports = {
  ONE: {
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
  TWO: {
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
  THREE: {
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
  FOUR: {
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
