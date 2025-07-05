const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
//Secure sign-up/login with hashed passwords and JWT-based authentication
dotenv.config({ path: "./config/.env" });

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        maxLength:50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,

    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        select: false,
    },
   
    createdat: {
        type: Date,
        default: Date.now,

    }
    
})

//Hash password before saving to the database
userSchema.pre("save", async function (next) {
    if (!this.isModified("passsword")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
//Method to compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);

}
//Method to generate JWT token
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRATION || "1h"
        }
    )
}
const User = mongoose.model("User", userSchema);
module.exports = User;