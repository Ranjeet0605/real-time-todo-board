const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const dotenv = require("dotenv");
dotenv.config({ path: "../config/.env" });

exports.isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    }
    catch (error) {
        return next(new ErrorHandler("Invalid Token, Please Login again ", 401));

    }

}

exports.isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return next(new ErrorHandler("Access denied, Admins only", 403));
        
    }
}