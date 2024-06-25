//bcrypt library se password hash larenge
const bcrypt = require("bcrypt");
//models ko import karana hoga taki db se interact kar paye using models
const User = require("../models/Users");
const { hash } = require("bcrypt");

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
                message:'User already exists',
            });
        }
        //password ko secure karo
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password,10); //hashedpassword create krte h using .hash func, hash ke andar 2 arguments pass krte h, ek password and second number of rounds 
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:'Error in hashing Password'
            })
        }
        //create entry for User
        const user = await User.create({ //db se interact kr rhe h toh await
            name,email,password:hashedPassword,role // jo bhi vyakti entry kr raha tha, uski entry db me store ho chuki h
        })

        return res.status(200).json({
            success:true,
            message:'User created successfully'
        })
    }
    catch(error){       //agar pure logic me code kahi faat gaya toh catch me aa jaengr
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'User cannot be registered, please try again later'
        })
    }
}

