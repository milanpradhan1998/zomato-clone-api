const { request, response } = require("express");
const MealTypesModel = require("../Model/MealTypesModel");
module.exports.MealTypesList = async (request, response) => {
  try {
    let result = await MealTypesModel.find();
    response.send({
      status: true,
      mealTypes: result,
    });
  } catch (error) {
    response.send({
      status: false,
      msg: error,
    });
  }
};
