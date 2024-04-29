const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// Action
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    res.send("Please fill in all required fields");
    return;
  }

  if (password.length < 6) {
    res.status(400);
    res.send("Password must be up to 6 characters");
    return;
  }

  // Check if user email already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    res.send("Email has already been used");
    return;
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
  });

  // Generate Token
  const token = generateToken(user._id);

  if (user) {
    const { _id, name, email, photo, phone, bio } = user;

    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    });
    return;
  } else {
    res.status(400);
    res.send("Invalid User Data");
    return;
  }
});

// Exports
module.exports = {
  registerUser,
};

// If you use brackets { } during export, import must have bracket
