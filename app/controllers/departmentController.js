const Department = require('../models/departmants')

module.exports.listDepartments = (req,res)=>{
    Department.find()
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.getDepartment = (req,res)=>{
    const id = req.params.id
    Department.findById(id)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.json(err)
    })
}

module.exports.newDepartment = (req,res)=>{
    const body = req.body
    const department = new Department(body)
    department.save()
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.json(err)
    })
}


module.exports.deleteDepartment = (req,res)=>{
    const id = req.params.id
    Department.findByIdAndDelete(id)
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

module.exports.updateDepartment = (req,res)=>{
    const id = req.params.id
    const body = req.body
    Department.findByIdAndUpdate(id,body,{new:true})
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