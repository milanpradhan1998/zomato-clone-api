const MenuItemsModel = require("../Model/MenuItemsModel");
module.exports.getRestaurantByMenuItemID = async (request, response) => {
  let { rest_id } = request.params;
  try {
    //must use try and catch to deal with server error
    let result = await MenuItemsModel.find({ restaurantId: rest_id }); //this is a mongoose method
    response.status(200).send({
      status: true,
      restaurant: result,
    });
  } catch (error) {
    response.status(500).send({
      status: false,
      error_msg: error,
    });
  }
};
