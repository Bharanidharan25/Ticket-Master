import React, { Component } from 'react'
import {Modal, Button, Form, Row, Col} from 'react-bootstrap'

export default class CreateNewModal extends Component {
    state={
        customer:"",
        department:"",
        priority:"",
        title:"",
        description:""
    }

    handleChange = (e)=>{
        let name = e.target.name
        let value = e.target.value
        this.setState({[name]:value})
    }


    render() {
        return (
            <div>
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    backdrop="static"
                    show={this.props.show}
                    onHide={this.props.onHide}
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Create Tickets
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicText">
                                <Row>
                                    <Col>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Ticket Title" name="title" onChange={this.handleChange}/>
                                    </Col>
                                    <Col>
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control as="select" name="department" onChange={this.handleChange} defaultValue={"select"}>
                                            <option value="select" disabled>select Department</option>
                                            {this.props.departments.map(department=>{
                                                return(
                                                    <option key={department._id} value={department._id}>{department.name}</option>
                                                )
                                            })}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group>
                            <Row>
                                <Col>
                                    <Form.Label>Customer</Form.Label>
                                    <Form.Control as="select" name="customer" onChange={this.handleChange} defaultValue={"select"}>
                                        <option value="select" disabled>select Customer</option>
                                        {this.props.customers.map(customer=>{
                                            return(
                                                <option key={customer._id} value={customer._id}>{customer.name}</option>
                                            )
                                        })}
                                    </Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label>Priority</Form.Label>
                                    <Form.Control as="select" name="priority" onChange={this.handleChange} defaultValue={"select"}>
                                        <option value='select' disabled>Select priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </Form.Control>
                                </Col>
                            </Row>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows="3" name="description" onChange={this.handleChange}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                        <Button onClick={()=>this.props.onSubmit(this.state)}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
