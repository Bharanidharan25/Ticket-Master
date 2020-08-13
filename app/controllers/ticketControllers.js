const Ticket = require('../models/tickets')

module.exports.listTickets = (req,res)=>{
    Ticket.find()
    .populate([{
        path: 'employee',
        populate: {
            path: 'department', 
            model: 'Department',
        },
    },'customer','department'])
    .then(data=>{
        res.json(data)
    })
    .catch(err=>res.json(err))
}

module.exports.getTicket = (req,res)=>{
    const id = req.params.id
    Ticket.findById(id)
    .populate([{
        path: 'employee',
        populate: {
            path: 'department', 
            model: 'Department',
        },
    },'customer','department'])
    .then(data=>{
        res.json(data)
    })
    .catch(err=>res.json(err))
}



module.exports.deleteTicket = (req,res)=>{
    const id = req.params.id
    Ticket.findByIdAndDelete(id)
    .then(data=>{
        if(data){
            res.json(data)
        }else{
            res.json({})
        }
    })
    .catch(err=>res.json(err))
}


module.exports.addTicket = (req,res)=>{
    const body = req.body
    const ticket = new Ticket({customer:body.customer,employee:body.employee,department:body.department,priority:body.priority,title:body.title,description:body.description,isCompleted:body.isCompleted})
    ticket.save()
    .then(data=>{
        let id = data._id
        Ticket.findById(id)
        .populate([{
            path: 'employee',
            populate: {
                path: 'department', 
                model: 'Department',
            },
        },'customer','department'])
        .then(data=>{
            res.json(data)
        })
        .catch(err=>res.json(err))
    })
    .catch(err=>res.json(err))
}


module.exports.updateTicket = (req,res)=>{
    const id = req.params.id
    const body = req.body
    Ticket.findByIdAndUpdate(id,body,{new:true})
    .populate([{
        path: 'employee',
        populate: {
            path: 'department', 
            model: 'Department',
        },
    },'customer','department'])

    .then(data=>{
        if(data){
            res.json(data)
        }else{
            res.json({})
        }
    })
    .catch(err=>res.json(err))
}