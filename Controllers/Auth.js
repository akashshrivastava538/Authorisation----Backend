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

// Login route handler (if needed)
exports.login = async (req, res) => {
    try {
        // Get data from request body
        const { email, password } = req.body;

        // Validation on email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details carefully",
            });
        }

        // Check for registered user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered",
            });
        }

        // Verify password and generate a JWT token
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Password Incorrect",
            });
        }

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user: {
                email: user.email,
                id: user._id,
                role: user.role,
            },
            message: "User logged in successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Login failure",
        });
    }
};