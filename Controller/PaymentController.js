const { request, response } = require("express");
const Razorpay = require("razorpay");
const OrdersModel = require("../Model/OrdersModel");
var crypto = require("crypto");
const YOUR_KEY_ID = "rzp_test_3q3QzuvllX2NXs";
const YOUR_SECRET = "IVoIgZTSSw84UVCIi4CI5onB";

var instance = new Razorpay({
  key_id: YOUR_KEY_ID,
  key_secret: YOUR_SECRET,
});

let _saveOrders = async (data) => {
  console.log(data, "data print");
  try {
    var newOrder = new OrdersModel({
      order_id: data.order_id,
      name: data.name,
      mobile: data.mobile,
      email: data.email,
      order_list: data.order_list,
      payment_id: data.payment_id,
      payment_status: data.payment_status,
      totalAmount: data.totalAmount,
    });
    await newOrder.save(); //save order in mango db mongoose method
    return true;
  } catch (error) {
    return false;
  }
};

module.exports.genOrderId = (request, response) => {
  let { amount } = request.body;
  // copy code from razorpay
  var options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  instance.orders.create(options, function (err, order) {
    if (err) {
      response.status(500).send({ status: false, order });
    } else {
      response.status(200).send({ status: true, order });
    }
  });
};

// verify payment
module.exports.verifyPayment = async (request, response) => {
  let data = request.body;
  let { payment_id, order_id, signature } = data;
  let body = order_id + "|" + payment_id;

  var expectedSignature = crypto
    .createHmac("sha256", YOUR_SECRET)
    .update(body.toString())
    .digest("hex");
  console.log(expectedSignature);
  console.log(signature);

  if (expectedSignature === signature) {
    data["payment_status"] = true;
    await _saveOrders(data);
    console.log(data);
    response.status(200).send({
      status: true,
    });
  } else {
    response.status(500).send({
      status: false,
    });
  }
};
