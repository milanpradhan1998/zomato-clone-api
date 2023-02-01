const OrdersModel = require("../Model/OrdersModel");

module.exports.saveOrders = async (request, response) => {
  let data = request.body;
  try {
    var newOrder = new OrdersModel({
      order_id: data.order_id,
      name: data.name,
      mobile: data.mobile,
      email: data.email,
      order_list: data.order_list,
      payment_id: data.payment_id,
      payment_status: data.payment_status,
    });
    await newOrder.save(); //save order in mango db mongoose method
    response.status(200).send({
      status: true,
      msg: "order placed successfully",
    });
  } catch (error) {
    response.status(500).send({
      status: false,
      msg: "order not placed",
    });
  }
};
