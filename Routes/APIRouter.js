const express = require("express");
const router = express.Router();
const location = require("../Controller/LocationController");
const restaurant = require("../Controller/RestaurentController");
const MealTypes = require("../Controller/MealTypesController");
const MenuItem = require("../Controller/MenuItemsController");
const orders = require("../Controller/OrderController");
const Payment = require("../Controller/PaymentController");

// my 1st api
router.get("/", (request, response) => {
  response.send("Zomato 2.0 home response");
});

router.get("/api", (request, response) => {
  response.send("my first api is ready.");
});

//getting from controller
router.get("/api/get-location-list", location.getLocationList);

//getting from restaurant loc_id
router.get(
  "/api/get-location-list/:loc_id",
  restaurant.getRestaurantListByLocID
);
//getting from restaurant id
router.get("/api/get-restaurant-list/:id", restaurant.getRestaurantListByID);
// filature
router.post("/api/filter", restaurant.getFilter);
// search restaurant
router.post("/api/search-restaurant", restaurant.searchRestaurant);

// meal type api
router.get("/api/get-meal-type-list", MealTypes.MealTypesList);

// menu items by rest id type api
router.get("/api/get-menu-items/:rest_id", MenuItem.getRestaurantByMenuItemID);

// save orders
router.post("/api/save-orders", orders.saveOrders);
// payment
router.post("/api/gen-order-id", Payment.genOrderId);
router.post("/api/verify-payment", Payment.verifyPayment);

module.exports = router;
