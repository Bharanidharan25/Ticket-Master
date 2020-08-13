import React, { Component } from 'react'
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import axios from 'axios'

export default class ActionModal extends Component {
    state={
        title:this.props.item.title,
        priority:this.props.item.priority,
        department:this.props.item.department._id,
        description:this.props.item.description,
        employee:(this.props.item.employee) ? this.props.item.employee._id : "NA",
        employeeList:[],
        isCompleted:this.props.item.isCompleted
    }

    componentDidMount(){
        axios.get(`http://localhost:3015/employees?department=${this.props.item.department._id}`)
        .then(response=>{
            this.setState({employeeList:response.data})
        })
        .catch(err=>console.log(err))
    }

    onChangeHandler = (e)=>{
        let name = e.target.name
        let value = e.target.value
        this.setState({[name]:value})
    }

    getEmployees = (e)=>{
        let value = e.target.value
        axios.get(`http://localhost:3015/employees?department=${value}`)
        .then(response=>{
            this.setState({employeeList:response.data})
        })
        .catch(err=>console.log(err))
    }

    render() {
        return (
            <div>
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.props.show}
                    onHide={this.props.onHide}
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Ticket Action
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Row>
                                     <Col>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control name="title" value={this.state.title} onChange={this.onChangeHandler}/>
                                    </Col>
                                    <Col>
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control as="select" name="isCompleted" value={this.state.isCompleted} onChange={this.onChangeHandler}>
                                            <option value={true}>Completed</option>
                                            <option value={false}>Pending</option>
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Label>Priority</Form.Label>
                                        <Form.Control as="select" name="priority" value={this.state.priority} onChange={this.onChangeHandler}>
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">Hign</option>
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control as="select" name="department" value={this.state.department} onChange={(e)=>{
                                            this.onChangeHandler(e)
                                            this.getEmployees(e)
                                        }}>
                                            {this.props.departments.map(dapartment=>{
                                                return(
                                                    <option key={dapartment._id} value={dapartment._id}>{dapartment.name}</option>
                                                )
                                            })}
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                        <Form.Label>Assigned To</Form.Label>
                                        <Form.Control as="select" name="employee" value={this.state.employee} onChange={this.onChangeHandler}>
                                            <option key='NA' value='NA'>NA</option>
                                        {this.state.employeeList && this.state.employeeList.map(employee=>{
                                                return(
                                                    <option key={employee._id} value={employee._id}>{employee.name}</option>
                                                )
                                            })}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows="3" name="description" value={this.state.description} onChange={this.onChangeHandler}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={()=>{
                                const data = {
                                    title:this.state.title,
                                    priority:this.state.priority,
                                    department:this.state.department,
                                    description:this.state.description,
                                    isCompleted:this.state.isCompleted
                                }
                                if(this.state.employee !== 'NA') data.employee = this.state.employee
                                this.props.editButtonHandler(data)
                            }
                        }>Submit</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
