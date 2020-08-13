import React, { Component } from 'react'
import {Modal, Button, Form} from 'react-bootstrap'

export default class EmployeeModal extends Component {
    state={
        _id:'',
        name:'',
        email:'',
        phone:'',
        department:'',
        validated:false,
        isDataNew: true,
    }

    componentDidUpdate(prevProps){
        if(prevProps.employee._id !== this.props.employee._id){
            let name= ''
            let email =''
            let phone= ''
            let _id= ''
            let department=''
            if(this.props.employee._id){
                _id= this.props.employee._id
                name = this.props.employee.name
                email = this.props.employee.email
                phone = this.props.employee.mobile
                department=this.props.employee.department._id
            }
            this.setState({_id,name,email,phone,department})
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit = (e) => {
        const emailValidator =/\S+@\S+\.\S+/
        const phoneValidator = /^[0-9]{10}$/
        if (this.state.name.length > 1 && this.state.department.length>1 && emailValidator.test(this.state.email) && phoneValidator.test(this.state.phone)){
            const formData = {
                department: this.state.department,
                name: this.state.name,
                email: this.state.email,
                mobile: this.state.phone
            }
            e.preventDefault()
            this.props.type==='new' ? 
                this.props.createNewEmployee(formData) : 
                this.props.editEmployee({...this.props.customer, name: this.state.name, department:this.state.department, email:this.state.email, mobile:this.state.phone})
        }else{
            e.preventDefault()
            this.setState({validated:true})
        }
    };


    render() {
        return (
            <Modal
            show={this.props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={this.props.hide}
            >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {this.props.type === 'new' ? 'Create New Employee' : this.props.type==='edit' ? 'Edit Employee Info' : 'Employee Info'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {(this.props.type ==='new' || this.props.type==='edit') ? (
                    <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>                
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control name='name' value={this.state.name} onChange={this.handleChange} type="text" placeholder="Enter Name" required/>
                            <Form.Control.Feedback type="invalid">
                                Please Enter your Name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Department</Form.Label>
                            <Form.Control name='department' value={this.state.department} onChange={this.handleChange} as="select" placeholder="Enter Department" required>
                            {this.props.departments.map(department=> <option key={department._id} value={department._id}>{department.name}</option>)}
                            </Form.Control>
                            <Form.Text className="text-muted">
                                Can't find your Dept. of choice?.. Create one from Main window
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                Please Select a Department.
                            </Form.Control.Feedback>
                        </Form.Group>   
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name='email' value={this.state.email} onChange={this.handleChange} type="email" placeholder="Enter email" required/>
                            <Form.Control.Feedback type="invalid">
                                Please Enter a valid Email.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control name='phone' value={this.state.phone} onChange={this.handleChange} type="tel" pattern="[0-9]{10}" placeholder="Enter Phone Number" required/>
                            <Form.Control.Feedback type="invalid">
                                Please Enter a valid Phone Number.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                ) : (
                    <>
                        <p><b>ID : </b> {this.props.employee._id}</p>
                        <p><b>Name : </b> {this.props.employee.name}</p>
                        <p><b>Department : </b>{this.props.employee.department && this.props.employee.department.name}</p>
                        <p><b>Email : </b>{this.props.employee.email}</p>
                        <p><b>Mobile : </b>{this.props.employee.mobile}</p>
                    </>
                )}
                
            </Modal.Body>
            <Modal.Footer>
                {this.props.type==='new' || this.props.type==='edit' ? (
                    <>
                    <Button variant='secondary' onClick={this.props.hide}>Cancel</Button>
                    <Button type='submit' variant='primary' onClick={this.handleSubmit}>Submit</Button>
                    </>
                ):(
                    <Button variant='secondary' onClick={this.props.hide}>Close</Button>
                )}
            </Modal.Footer>
        </Modal>
        )
    }
}
