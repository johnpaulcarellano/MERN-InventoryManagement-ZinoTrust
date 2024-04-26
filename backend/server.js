const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize the Express
const app = express();

// Need to connect to MongoDB
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start Sever
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
