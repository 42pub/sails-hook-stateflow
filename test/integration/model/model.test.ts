import { Model } from "waterline";
let orderInstance: Model;

describe("Model", function () {
  this.timeout(10000);

  describe("model order", async function () {
    it("Exist next() method", async function () {
      orderInstance = await Order.create({}).fetch();
      console.log(orderInstance);
      //sails.models["order"].next();
    });
  });
});
