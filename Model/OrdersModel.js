const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
  order_id: { type: String },
  signature: { type: String },
  name: { type: String },
  mobile: { type: Number },
  email: { type: String },
  order_list: { type: Array },
  payment_id: { type: String },
  payment_status: { type: Boolean },
  totalAmount: { type: Number },
});
const OrdersModel = mongoose.model("order", ordersSchema, "orders");

module.exports = OrdersModel;
