//bcrypt library se password hash larenge
const bcrypt = require("brcypt");
//models ko import karana hoga taki db se interact kar paye using models
const User = require("../models/Users");

//signup ka route handler
exports.signup = async (req,res) =>{
    try{
        //get data
        const {name,email,password,role} = req.body; // req ki body se ye chaaro data fetch krlo
        //check if user already exost
        //iske liye to db interaction krni pdegi
        //db ki call h toh await use kr lena, interact krna chatte hoto model use kr lena
        const existingUser = await User.findOne({email}); //kya is email ke corr koo entry hai, agar hai toh first entry ko return karl=do
        //agar ek valid entry mil gyi, toh aage process krne ki koi need nhi, throw krdo

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists",
            })
        }
    }
    catch(error){

    }
}