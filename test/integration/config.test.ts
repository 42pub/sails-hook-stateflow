import { Model } from "waterline";
let attributes: Model;

describe("Config", function () {
  this.timeout(10000);

  it("Load states from config", async function () {
    let state = Order.state.ONE;
    if (state === undefined) throw "";
  });

  it("Load calbacks from api folder", async function () {
    
    let state = Order.state.ONE;
    if (state.routeRules.length === 0) throw "";
    
    if (await state.routeRules[0](null, ()=>{}) !== "TEST_ROUTE_RULES" ) throw "";
    
    await state.stateValidation[0](null, ()=>{})
    if ( sails.stateflow_test.stateValidation !== true ) throw "";
    
    await state.inState[0](null, ()=>{})
    if ( sails.stateflow_test.inState !== true  ) throw "";

    await state.afterState[0](null, ()=>{})
    if ( sails.stateflow_test.afterState !== true  ) throw "";

  });
 
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
