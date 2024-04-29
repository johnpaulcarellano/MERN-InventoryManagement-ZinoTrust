const express = require("express");
const { registerUser } = require("../controllers/userController");
const router = express.Router();

// Set up a routes
router.post("/register", registerUser);
// Register User is a controller

// Exports
module.exports = router;
