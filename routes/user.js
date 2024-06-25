const express = require("express"); // route wali file me route create krne ke liye hame router chahiye, uske liye express ka instance chahiye
const router = express.Router();

//hame 2 handler chahiye,
//ek login ke liye aur ek signup ke liye
const {login, signup} = require("../Controllers/Auth") // dono handler ko import karayenge, wo Controller me pare honge
// import kara liye aur

// router.post("/login",login); //login request ko login handler se map kardo
router.post("/signup",signup); //signup request ko signup handler se map kardo

//export karado
module.exports = router;