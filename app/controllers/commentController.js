const Comment = require('../models/comments')

module.exports.commentList = (req,res)=>{
    if(req.query &&  req.query.ticket){
        Comment.find({ticket:req.query.ticket})
        .populate('author')
        .then(comment=>{
            res.json(comment)
        })
        .catch(err=>res.json(err))
    }else{
        Comment.find()
        .populate('author')
        .then(comment=>{
            res.json(comment)
        })
        .catch(err=>res.json(err))
    }
}


module.exports.addComment = (req,res)=>{
    const body = req.body
    const comment = new Comment({author:body.author,comment:body.comment,ticket:body.ticket})
    comment.save()
    .then(comment=>{
        let id = comment._id
        Comment.findById(id)
        .populate('author')
        .then(comment=>res.json(comment))
        .catch(err=>res.json(err))
    })
    .catch(err=>res.json(err))
}

module.exports.deleteComment = (req,res)=>{
    const id = req.params.id
    Comment.findByIdAndDelete(id)
    .then(comment=>{
        res.json(comment)
    })
    .catch(err=>res.json(err))
}

module.exports.updateComment = (req,res)=>{
    const id = req.params.id
    const body = req.body
    Comment.findByIdAndUpdate(id,body,{new:true})
    .populate('author')
    .then(comment=>{
        res.json(comment)
    })
    .catch(err=>res.json(err))
}