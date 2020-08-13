const express = require('express')
const route = express.Router()
const departmentController = require('../app/controllers/departmentController')
const customerController = require('../app/controllers/customerController')
const employeeController = require('../app/controllers/employeeController')
const ticketController = require('../app/controllers/ticketControllers')
const commentController = require('../app/controllers/commentController')

route.get('/departments',departmentController.listDepartments)
route.get('/departments/:id',departmentController.getDepartment)
route.post('/departments',departmentController.newDepartment)
route.delete('/departments/:id',departmentController.deleteDepartment)
route.put('/departments/:id',departmentController.updateDepartment)


route.get('/customers',customerController.listCustomer)
route.get('/customers/:id',customerController.getCustomer)
route.post('/customers',customerController.addCustomer)
route.delete('/customers/:id',customerController.deleteCustomer)
route.put('/customers/:id',customerController.updateCustomer)


route.get('/employees',employeeController.listEmployees)

route.get('/employees/:id',employeeController.showEmployee)
route.post('/employees',employeeController.addEmployee)
route.delete('/employees/:id',employeeController.deleteEmployee)
route.put('/employees/:id',employeeController.updateEmployee)

route.get('/tickets',ticketController.listTickets)
route.get('/tickets/:id',ticketController.getTicket)
route.post('/tickets',ticketController.addTicket)
route.delete('/tickets/:id',ticketController.deleteTicket)
route.put('/tickets/:id',ticketController.updateTicket)

route.get('/comments',commentController.commentList)
route.post('/comments',commentController.addComment)
route.put('/comments/:id',commentController.updateComment)
route.delete('/comments/:id',commentController.deleteComment)

module.exports = route