const { request, response } = require("express");
const RestaurantModel = require("../Model/RestaurentModel");
module.exports.getRestaurantListByLocID = async (request, response) => {
  let { loc_id } = request.params; //params for getting data from url
  try {
    let result = await RestaurantModel.find(
      { location_id: loc_id },
      { locality: 1, name: 1, city: 1, image: 1, _id: 0 }
    ); //filtering data
    if (result.length === 0) {
      //checking the return result is empty or not
      response.send({
        status: false,
        restaurant: "result not found",
      });
    } else {
      response.send({
        status: true,
        restaurant: result,
      });
    }
  } catch (error) {
    response.send({
      status: false,
      error_msg: error,
    });
  }
};

// get restaurant by ID
module.exports.getRestaurantListByID = async (request, response) => {
  let { id } = request.params;
  try {
    //must use try and catch to deal with server error
    let result = await RestaurantModel.findById(id); //this is a mongoose method
    response.send({
      status: true,
      restaurant: result,
    });
  } catch (error) {
    response.send({
      status: false,
      error_msg: error,
    });
  }
};
module.exports.getFilter = async (request, response) => {
  let { mealtype_id, location_id, cuisine_id, l_cost, h_cost, sort } =
    request.body;
  sort = sort ? sort : 1; //turnery operator like if else
  const filterData = {};
  if (mealtype_id !== undefined) filterData["mealtype_id"] = mealtype_id;
  if (location_id !== undefined) filterData["location_id"] = location_id;
  //Cuisine filter $in: require to search the array
  if (cuisine_id !== undefined) filterData["cuisine_id"] = { $in: cuisine_id };
  // low cost and high cost
  // const l_cost = 900;
  // const h_cost = 1000;
  if (l_cost !== undefined && h_cost !== undefined)
    filterData["min_price"] = { $gt: l_cost, $lt: h_cost };
  console.log(filterData);
  try {
    let result = await RestaurantModel.find(filterData, {
      name: 1,
      city: 1,
      locality: 1,
      location_id: 1,
      min_price: 1,
      image: 1,
      cuisine_id: 1,
      cuisine: 1,
    })
      .sort({ min_price: sort })
      .limit(2);
    if (result.length === 0) {
      response.send({
        status: false,
        msg: "result not found",
      });
    } else {
      console.log(result);
      response.send({
        status: true,
        data: result,
      });
    }
  } catch (error) {
    response.send({
      status: false,
      msg: error,
    });
  }
};

// search Restaurant

module.exports.searchRestaurant = async (request, response) => {
  let { search, loc_id } = request.body;
  console.log(search, loc_id);
  // response.send({
  //   status: true,
  //   response: search,
  // });

  try {
    let result = await RestaurantModel.find(
      {
        name: { $regex: search + ".*", $options: "i" },
        location_id: Number(loc_id),
      },
      {
        _id: 1,
        name: 1,
        city: 1,
        locality: 1,
        location_id: 1,
        min_price: 1,
        image: 1,
        cuisine_id: 1,
        cuisine: 1,
      }
    );
    response.status(200).send({
      status: true,
      restaurant: result,
    });
  } catch (error) {
    response.status(500).send({
      status: false,
      error,
    });
  }
};
