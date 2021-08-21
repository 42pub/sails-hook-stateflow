describe("Flows", function () {
  this.timeout(10000);

  it("next() not crash", async function () {
    let order = await Order.create({}).fetch();
    try {
      await Order.next(order.id);
    } catch (error) {
      console.log(error);
      throw "";
    }

    order1 = await Order.findOne(order.id);

    if ("TWO" !== order1.state) throw "";
  });

  it(".next(empty) with 2 routes without RouteRules", async function () {
    let order = await Order.create({}).fetch();

    await Order.next(order.id);

    let next2error;
    try {
      await Order.next(order.id);
    } catch (error) {
      next2error = error;
    }
    if (!next2error) throw "";

    let order1 = await Order.findOne(order.id);
    if ("TWO" !== order1.state) throw "";
  });

  it("add routeRules for Order & next() to THREE state", async function () {
    Order.state.TWO.routeRules.push(async function (data, route) {
      route("THREE");
    });
    let order = await Order.create({}).fetch();

    if(Order.state.TWO.routeRules.length !== 2) throw "Not found routerule THREE in routeRules array"

    try {
      await Order.next(order.id);
    } catch (error) {
      console.log(error);
    }

    try {
      await Order.next(order.id);
    } catch (error) {
      if (!error) throw "not catched undefined statename"
    }

    Order.state.THREE  = Order.state.TRHEE
    delete(Order.state.TRHEE)

    try {
      await Order.next(order.id);
    } catch (error) {
      console.log(error);
    }

    let order1 = await Order.findOne(order.id);
    if ("THREE" !== order1.state) throw "";
  });
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
