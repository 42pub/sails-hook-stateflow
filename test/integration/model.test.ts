import { Model } from "waterline";
let attributes: Model;
import { State } from "../../models/State";

describe("Model", function () {
  this.timeout(10000);

  it("Exist state field", async function () {
    attributes = Order.attributes;
    if (!attributes.state) {
      throw "";
    }
  });

  it("Exist method next()", async function () {
    if (!Order.next && !(typeof Order.next === "function")) {
      throw "";
    }
  });

  it("First from startState", async function () {
    let order = await Order.create({}).fetch();
    if (order.state !== Order.stateflowModelConfig.startState) {
      throw "";
    }
  });

  it("State has callbacks", async function () {
    let state = Order.state.ONE;
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
    let state = Order.state.ONE
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
