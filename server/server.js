const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const cors = require("cors");
const server = express();

// Middleware
server.use(express.json());
server.use(cors({ origin: "http://localhost:3000", credentials: true }));  // CORS to allow frontend communication
server.use(express.urlencoded({ extended: true }));

// Session middleware
server.use(
  session({
    secret: "@smarthealthcare123",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/SHC")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// Schema for authentication
const AuthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
});

// Model for authentication
const USER = mongoose.model("User", AuthSchema);

// Registration Route
server.post("/userAuth", async (req, res) => {
  const { name, email, password, userType } = req.body;
  try {
    const userExists = await USER.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new USER({
      name,
      email,
      password: hashedPassword,
      userType,
    });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Login Route
server.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await USER.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ error: "Invalid credentials" });
    }

    // Create session for login
    req.session.user = {
      userId: user._id,
      userEmail: user.email,
      userType: user.userType,
    };

    return res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Start the server
server.listen(2000, () => {
  console.log("Server is running on port 2000...");
});
