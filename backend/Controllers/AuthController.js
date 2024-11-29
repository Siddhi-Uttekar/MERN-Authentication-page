const User = require("../Models/UserModel");
const { createSecretToken } = require("../utils/SecretToken.js");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
      const { email, password, username, createdAt } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.json({ message: "User already exists" });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the new user with hashed password
      const user = await User.create({ email, password: hashedPassword, username, createdAt });
      const token = createSecretToken(user._id);

      res.cookie("token", token, {
          withCredentials: true,
          httpOnly: false,
      });

      res.status(201).json({ message: "User signed up successfully", success: true, user });
      next();
  } catch (error) {
      console.error(error);
  }
};


module.exports.Login = async (req, res) => {
  try {
      const { email, password } = req.body;

      // Ensure email and password are provided
      if (!email || !password) {
          return res.json({ message: "All fields are required" });
      }

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
          return res.json({ message: "User not found" });
      }

      // Compare the entered password with the hashed password from the DB
      const isMatch = await bcrypt.compare(password, user.hashedPassword);

      if (!isMatch) {
          return res.json({ message: "Incorrect password or email" });
      }

      // Log the values for debugging
      console.log('Password from request body:', password);
      console.log('Password from user record (hashed):', user.password);

      // Create a new token
      const token = createSecretToken(user._id);
      res.cookie("token", token, { withCredentials: true, httpOnly: false });

      res.status(200).json({ message: "User logged in successfully", success: true });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
  }
};
