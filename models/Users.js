//model banane ke liye haame 2 chiz required hoti, 
//ek naam of model
//second schema, schema banane ke liye hame mongoose ki need hoti
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    //hame name chahiye
    name:{
        type:String,
        require:true,
        trim:true,
    },
    email:{
        type:String,
        require:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["Admin","Student","Visitor"], //enum use krne se role ka space limit ho jata h ; in teeno mese hi ek value hogi, nothing other than that
    }
})

//hamne schema define kr diya, ab model create krke export krna h

module.exports = mongoose.model("user",userSchema);