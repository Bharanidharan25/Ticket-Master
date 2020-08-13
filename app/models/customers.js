const mongoose = require('mongoose')
const schema = mongoose.Schema
const validator = require('validator')

const customerSchema = new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        validate:{
            validator:function(value){
                return validator.isEmail(value)
            },
            message:function(){
                return 'invalid email format'
            }
        },
        unique:true,
        required:true
    },
    mobile:{
        type:String,
        minlength:10,
        maxlength:10,
        validate:{
            validator:function(value){
                return validator.isNumeric(value)
            },
            message:function(){
                return "invalid mobile number"
            }
        },
        required:true,
        unique:true
    }
})


const Customer = mongoose.model("Customer",customerSchema)

module.exports = Customer