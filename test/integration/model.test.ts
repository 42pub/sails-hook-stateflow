import { Model } from "waterline";
let attributes: Model;

describe("Model", function () {
  this.timeout(10000);

  describe("order", async function () {
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

  });
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}