
describe("Flows", function () {
  this.timeout(10000);

  it("next() not crash", async function () {

    let order = await Order.create({}).fetch()
    try {
      await Order.next(order.id);
    } catch (error) {
      console.log(error);
      throw ""
    }

    order1 = await Order.findOne(order.id)

    if ( "TWO" !== order1.state) throw ""

  });

  it("add routeRules for Order & next()", async function () {
    //console.log(Order.state.ONE.routeRules);




  });



});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
