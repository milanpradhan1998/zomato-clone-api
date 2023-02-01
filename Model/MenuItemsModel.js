const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const MenuItemsSchema = new Schema({
  _id: { type: ObjectId },
  name: { type: String },
  description: { type: String },
  ingridients: { type: Array },
  restaurantId: { type: ObjectId },
  image: { type: String },
  qty: { type: Number },
  price: { type: Number },
});
const MealTypesModel = mongoose.model("menuitem", MenuItemsSchema, "menuitems");
module.exports = MealTypesModel;
