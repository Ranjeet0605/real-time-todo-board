const catchAsyncError = require("../utils/catchAsyncError");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "../config/.env" });

exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
        return next(new ErrorHandler("Please provide all fields", 400));
    }
    const user = await User.create({
        username,
        email,
        password,
    })
    const token = user.generateAuthToken();
    res.status(201).json({
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        
        },
        token:token
    });
});
// lgoin user 
// exports.loginUser = catchAsyncError(async (req, res, next) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         return next(new ErrorHandler("Please provide all fields", 400));
//     }
//  })