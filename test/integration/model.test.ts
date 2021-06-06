//import { Model } from "waterline";
let attributes: Model;

describe("Model", function () {
  this.timeout(10000);

  describe("model order", async function () {
    it("Exist state field", async function () {
      attributes = Order.attributes;
      // console.log(attributes)

      if (!attributes.state) {
        throw "";
      }
    });

    it("Exist method next()", async function () {
      
      await sleep(1236)
      console.log(Order, NotOrder);

       console.log(Order.time, NotOrder.time);
      if (!Order.next && !(typeof Order.next === "function")) {
        throw "";
      }
    });
  });
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}