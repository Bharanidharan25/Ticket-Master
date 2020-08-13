const Employee = require('../models/employee')


module.exports.listEmployees = (req,res)=>{
    if(req.query && req.query.department){
        Employee.find({department:req.query.department}).populate("department")
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            res.json(err)
        })
    }else{
        Employee.find().populate(["department"])
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            res.json(err)
        })
    }
}


module.exports.showEmployee = (req,res)=>{
    const id = req.params.id
    Employee.findById(id)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.json(err)
    })
}

module.exports.addEmployee = (req,res)=>{
    const body = req.body
    const employee = new Employee({name:body.name,email:body.email,mobile:body.mobile,department:body.department})
    employee.save()
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.json(err)
    })
}


module.exports.deleteEmployee = (req,res)=>{
    const id = req.params.id
    Employee.findByIdAndDelete(id)
    .then(data=>{
        if(data){
            res.json(data)
        }else{
            res.json({})
        }
    })
    .catch(err=>{
        res.json(err)
    })
}


module.exports.updateEmployee = (Req,res)=>{
    const id = req.params.id
    const body = req.body
    Employee.findByIdAndUpdate(id,body,{new:true})
    .then(data=>{
        if(data){
            res.json(data)
        }else{
            res.json({})
        }
    })
    .catch(err=>res.json(err))
}