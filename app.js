const express = require("express");
//importing mongoose
const mongoose = require("mongoose");
// importing APIRouter.js file using express
const APIRouter = require("./Routes/APIRouter");

// CORS POLICY ENABLE
const cors = require("cors");

const app = express();
const PORT = 8800;
const MONGODB_URI =
  "mongodb+srv://Admin:768028@mymongodb.ltaknvt.mongodb.net/zomatodb?retryWrites=true&w=majority"; // GETTING MONGODB URI AND CONNECTING DATA BSE

//using cors
app.use(cors());

// we need to convert string data to json
app.use(express.json());
// post method only get data from post not in get and params
app.use(express.urlencoded({ extended: false }));

// how to use APIRouter in app.js
app.use("/", APIRouter);

// checking DB confection using mongoose before starting server
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Data Base confection successful", true); //DB connection message
    app.listen(PORT, function () {
      console.log("Server is running on port ::", PORT);
    });
  })
  .catch((error) => {
    console.log("DB connection Error!! ::", error);
  });
