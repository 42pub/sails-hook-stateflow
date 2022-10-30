describe("Flows", function () {
  this.timeout(10000);

  it("next() not crash", async function () {
    let order = await sails.models.order.create({}).fetch();
    try {
      await sails.models.order.next(order.id);
    } catch (error) {
      console.log(error);
      throw "";
    }

    let order1 = await sails.models.order.findOne(order.id);

    if ("TWO" !== order1.state) throw "";
  });

  it(".next(empty) with 2 routes without RouteRules", async function () {
    let order = await sails.models.order.create({}).fetch();

    await sails.models.order.next(order.id);

    let next2error;
    try {
      await sails.models.order.next(order.id);
    } catch (error) {
      next2error = error;
    }
    if (!next2error) throw "";

    let order1 = await sails.models.order.findOne(order.id);
    if ("TWO" !== order1.state) throw "";
  });

  it("add routeRules for Order & next() to THREE state", async function () {
    sails.models.order.state.TWO.routeRules.push(async function (data, route) {
      route("THREE");
    });
    let order = await sails.models.order.create({}).fetch();

    if(sails.models.order.state.TWO.routeRules.length !== 2) throw "Not found routerule THREE in routeRules array"

    try {
      await sails.models.order.next(order.id);
    } catch (error) {
      console.log(error);
    }

    try {
      await sails.models.order.next(order.id);
    } catch (error) {
      if (!error) throw "not catched undefined statename"
    }

    sails.models.order.state.THREE  = sails.models.order.state.TRHEE
    delete(sails.models.order.state.TRHEE)

    try {
      await sails.models.order.next(order.id);
    } catch (error) {
      console.log(error);
    }

    let order1 = await sails.models.order.findOne(order.id);
    if ("THREE" !== order1.state) throw "";
  });
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
