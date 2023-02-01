// importing data from model
const LocationModel = require("../Model/LocationModel");
// mongoose return a promise so we need async and await
module.exports.getLocationList = async (request, response) => {
  let result = await LocationModel.find();
  response.send({
    status: true,
    location: result,
  });
};
