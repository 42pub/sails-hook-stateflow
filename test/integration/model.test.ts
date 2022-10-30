let attributes: any;
import { State } from "../../models/State";

describe("Model", function () {
  this.timeout(10000);

  it("Exist state field", async function () {
    attributes = sails.models.order.attributes;
    if (!attributes.state) {
      throw "";
    }
  });

  it("Exist method next()", async function () {
    if (!sails.models.order.next && !(typeof sails.models.order.next === "function")) {
      throw "";
    }
  });

  it("First from startState", async function () {
    let order = await sails.models.order.create({}).fetch();
    if (order.state !== sails.models.order.stateflowModelConfig.startState) {
      throw "";
    }
  });

  it("State has callbacks", async function () {
    let state = sails.models.order.state.ONE;
    if (
      state.stateValidation === undefined ||
      state.inState === undefined ||
      state.afterState === undefined ||
      state.routeRules === undefined
    ) {
      throw "";
    }
  });

  it("State has methods callbacks2", async function () {
    let state = sails.models.order.state.ONE
    if (
      state.runStateValidation === undefined ||
      state.runInState === undefined ||
      state.runAfterState === undefined ||
      state.getNextState === undefined
    ) {
      throw "";
    }
  });




});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
