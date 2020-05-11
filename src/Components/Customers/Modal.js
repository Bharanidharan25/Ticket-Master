import React from 'react'
import {Modal, Button, Form} from 'react-bootstrap'

export default class ModalComponent extends React.Component {

    state={
        _id:'',
        name:'',
        email:'',
        phone:'',
        validated:false,
        isDataNew: true
    }

    componentDidUpdate(prevProps){
        if(prevProps.customer._id !== this.props.customer._id){
            let name= ''
            let email =''
            let phone= ''
            let _id= ''
            if(this.props.customer._id){
                _id= this.props.customer._id
                name = this.props.customer.name
                email = this.props.customer.email
                phone = this.props.customer.mobile
            }
            this.setState({_id,name,email,phone})
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit = (e) => {
        const emailValidator =/\S+@\S+\.\S+/
        const phoneValidator = /^[0-9]{10}$/
      if (this.state.name.length > 1 && emailValidator.test(this.state.email) && phoneValidator.test(this.state.phone)){
        const formData = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.phone
        }
        e.preventDefault()
        this.props.type==='new' ? 
            this.props.createNewCustomer(formData) : 
            this.props.editCustomer({...this.props.customer, name: this.state.name, email:this.state.email, mobile:this.state.phone})
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
                        {this.props.type === 'new' ? 'Create New Customer' : this.props.type==='edit' ? 'Edit Customer Info' : 'Customer Info'}
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
                            <p><b>ID : </b> {this.props.customer._id}</p>
                            <p><b>Name : </b> {this.props.customer.name}</p>
                            <p><b>Email : </b>{this.props.customer.email}</p>
                            <p><b>Mobile : </b>{this.props.customer.mobile}</p>
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
        );
    }
}
