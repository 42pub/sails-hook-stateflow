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
      if (!Order.next && !(typeof Order.next === "function")) {
        throw "";
      }
    });
  });
});
