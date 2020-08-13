const Customer = require('../models/customers')

module.exports.listCustomer = (req,res)=>{
    Customer.find()
    .then(customer=>{
        res.json(customer)
    })
    .catch(err=>{
        res.json(err)
    })
}

module.exports.getCustomer = (req,res)=>{
    const id = req.params.id
    Customer.findById(id)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.json(err)
    })
}


module.exports.addCustomer = (req,res)=>{
    const body = req.body
    const customer = new Customer({name:body.name,email:body.email,mobile:body.mobile})
    customer.save()
    .then(customer =>{
        res.json(customer)
    })
    .catch(err=>{
        res.json(err)
    })
}

module.exports.deleteCustomer = (req,res)=>{
    const id= req.params.id
    Customer.findByIdAndDelete(id)
    .then(customer=>{
        if(customer){
            res.json(customer)
        }else{
            res.json({})
        }
    })
    .catch(err=>{
        res.json(err)
    })
}

module.exports.updateCustomer = (req,res)=>{
    const id = req.params.id
    const body = req.body
    Customer.findByIdAndUpdate(id,body  ,{new:true})
    .then(customer=>{
        if(customer){
            res.json(customer)
        }else{
            res.json({})
        }
    })
    .catch(err=>{
        res.json(err)
    })
}