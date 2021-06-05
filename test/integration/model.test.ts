import { Model } from "waterline";
let orderInstance: Model;

describe("Model", function () {
  this.timeout(10000);

  describe("model order", function () {
    it("Exist next() method",  function () {
      orderInstance = Order.create({}).fetch();
      console.log(orderInstance);
      //sails.models["order"].next();
    });
  });
});
