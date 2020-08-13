const mongoose = require('mongoose')
const schema = mongoose.Schema

const commentSchema = new schema({
    author:{
        type:schema.Types.ObjectId,
        ref:'Employee',
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    ticket:{
        type:schema.Types.ObjectId,
        ref:'Ticket',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const Comment = mongoose.model('Comment',commentSchema)
module.exports = Comment