// import schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// create schema
const LocationsSchema = new Schema({
  name: { type: String },
  city_id: { type: Number },
  location_id: { type: Number },
  city: { type: String },
  country_name: { type: String },
});
// create model ("location"=>Model name,LocationsSchema=>schema name,"locations"=>collection name in data base)
const LocationsModel = mongoose.model("location", LocationsSchema, "locations");

//export module
module.exports = LocationsModel;
