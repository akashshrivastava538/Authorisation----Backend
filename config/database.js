//sbse pehle mongoose ka instance leke aayenge
const mongoose = require("mongoose");

require("dotenv").config(); // jo bhi .env configuration h usko load kardo

exports.connect = () => { // lets se method ka naam connect rakh diya, and then arrow func create kiya
    mongoose.connect()
}