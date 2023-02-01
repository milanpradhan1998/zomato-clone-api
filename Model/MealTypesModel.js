const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const MealTypesSchema = new Schema({
  name: String,
  content: String,
  image: String,
  meal_type: Number,
});
const MealTypesModel = mongoose.model("mealtype", MealTypesSchema, "mealtypes");
module.exports = MealTypesModel;
