const mongoose = require('mongoose')
const schema = mongoose.Schema

const departmentSchema = new schema({
    name:{type:String, required:true},
})

const Department = mongoose.model('Department',departmentSchema)

module.exports = Department