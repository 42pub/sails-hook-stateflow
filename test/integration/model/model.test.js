"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let orderInstance;
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
