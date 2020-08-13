const mongoose = require('mongoose')
const validator = require('validator')
const schema = mongoose.Schema

const employeeSchema = new schema({
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
            message:'invalid email'
        },
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        validate:{
            validator:function(value){
                return validator.isNumeric(value)
            },
            message:'invalid mobile number'
        }
    },
    department:{
        type: schema.Types.ObjectId,
        required:true,
        ref:'Department'
    }
})


const Employee = mongoose.model('Employee',employeeSchema)

module.exports = Employee