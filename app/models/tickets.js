const mongoose = require('mongoose')
const schema = mongoose.Schema

const ticketSchema = new schema({
    customer:{
        type:schema.Types.ObjectId,
        required:true,
        ref:'Customer'
    },
    employee:{
        type:schema.Types.ObjectId,
        ref:'Employee'
    },
    department:{
        type:schema.Types.ObjectId,
        required:true,
        ref:'Department'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    priority:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        required:true
    }
})

const Ticket = mongoose.model('Ticket',ticketSchema)

module.exports = Ticket