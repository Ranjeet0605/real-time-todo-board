const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/users");
// const { isAuthenticated } = require("../middlewares/auth");

// Route to register a new user
console.log("registerUser:", registerUser);
router.post("/register", registerUser);

