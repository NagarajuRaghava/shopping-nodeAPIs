const mongoose = require("mongoose");

const signupModel = mongoose.Schema({
    email:{
        type: String,
        required : true
    },
    password:{
        type:String,
        required : true
    }
})

const SignUp = mongoose.model('SignUp', signupModel)

module.exports = SignUp