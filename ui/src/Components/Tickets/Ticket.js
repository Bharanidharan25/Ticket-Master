import React, { Component } from 'react'
import {Table, Button, ButtonGroup} from 'react-bootstrap'
import ShowDetailModal from './ShowDetailModal'
import ActionModal from './ActionModal'
import axios from 'axios'
import moment from 'moment'
import businessImage from '../../businessman.png'
import Swal from 'sweetalert2'

export default class Ticket extends Component {
    state={
        ticket:{...this.props.location.state.myProp},
        isDetailModalOpen : false,
        isActionModalOpen:false,
        type:"",
        comments:[],
        showDetailData:{},
        departments:[]
    }

    componentDidMount(){
        axios.get(`http://localhost:3015/comments?ticket=${this.state.ticket._id}`)
        .then(response=>{
            this.setState({comments:response.data})
        })
        .catch(err=>console.log(err))


        axios.get("http://localhost:3015/departments")
        .then(response=>{
            this.setState({departments:response.data})
        })
        .catch(err=>console.log(err))
    }

    handleClose = ()=>{
        this.setState({isDetailModalOpen:!this.state.isDetailModalOpen})
    }

    handleActionModal = ()=>{
        this.setState({isActionModalOpen:!this.state.isActionModalOpen})
    }


    editButtonHandler = (data)=>{
        axios.put(`http://localhost:3015/tickets/${this.state.ticket._id}`,data)
        .then(response=>{
            this.setState({ticket:{...response.data}})
            this.handleActionModal()
            Swal.fire(
                'Success',
                'Record deleted successfully',
                'success'
            )
        })
        .catch(err=>console.log(err))
    }

    handleDelete = ()=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          })
        .then(result=>{
            if(result.value){
                axios.delete(`http://localhost:3015/tickets/${this.state.ticket._id}`)
                .then((response)=>{
                    if(response.status===200){
                    this.props.history.push(`/tickets`)
                    Swal.fire(
                        'Success',
                        'Record deleted successfully',
                        'success'
                    )}
                })
            }
        })
    }

    render() {
        return (
            <div style={{margin:"20px"}}>
                <h3>Ticket Detail</h3>
                <div style={{marginTop:"25px"}}>
                    <div className="ticketContainerLeft">
                        <Table bordered size="sm">
                            <thead>
                                <tr>
                                <th colSpan="2" style={{backgroundColor:"lightGrey"}}>ID {this.state.ticket._id}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Title</td>
                                    <td>{this.state.ticket.title}</td>
                                </tr>
                                <tr>
                                    <td>Created At</td>
                                    <td>{moment(this.state.ticket.createdAt).format("llll")}</td>
                                </tr>
                                <tr>
                                    <td>Customer</td>
                                    <td onClick={()=>{
                                        this.setState({type:"customer",showDetailData:this.state.ticket.customer})
                                        this.handleClose()
                                    }} style={{cursor:'pointer'}}>{this.state.ticket.customer.name}</td>
                                </tr>
                                <tr>
                                    <td>Department</td>
                                    <td>{this.state.ticket.department.name}</td>
                                </tr>
                                <tr>
                                    <td>Priority</td>
                                    <td className={this.state.ticket.priority}>{this.state.ticket.priority}</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>{this.state.ticket.isCompleted ? "Completed" : "Pending"}</td>
                                </tr>
                                <tr>
                                    <td>Assigned to</td>
                                    <td>{(this.state.ticket.employee)? this.state.ticket.employee.name :"Not Assigned"}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <ButtonGroup>
                            <Button variant="info" onClick={()=>this.handleActionModal()}>Edit</Button>
                            <Button variant="secondary" onClick={()=>this.handleDelete()}>Delete</Button>
                        </ButtonGroup>
                    </div>
                    <div className="ticketContainerRight">
                        <h5>Ticket Title</h5><hr/>
                        <p>{this.state.ticket.title}</p>
                        <h5>Description</h5><hr/>
                        <p style={{textAlign: 'justify'}}>{this.state.ticket.description}</p>
                        <h5>Comments</h5>
                        <div className="commentdiv">
                            {this.state.comments.length>0 ? this.state.comments.map(comment=>{
                                    return(   
                                        <div key={comment._id} className="comment">
                                                <div>
                                                    <span style={{fontSize:'13px'}}>{moment(comment.createdAt).format('llll')}</span><br/>
                                                    {comment.comment}<br/>
                                                    <em style={{fontSize:"13px",cursor:"pointer"}} onClick={()=>{
                                                        this.setState({showDetailData:comment.author,type:"employee"})
                                                        this.handleClose()
                                                    }}>{comment.author.name}</em>
                                                </div>
                                                <div style={{padding:"20px"}}>
                                                <img src={businessImage} alt="profile" height="45px" width="45px"/>
                                                </div>
                                        </div>
                                    )
                                }):
                                (
                                    <p>No Comments to display</p>
                                )
                            }
                        </div>
                    </div>
                </div>
                <ShowDetailModal show={this.state.isDetailModalOpen} onHide={this.handleClose} data={this.state.showDetailData} type={this.state.type}/>
                <ActionModal show={this.state.isActionModalOpen} onHide={this.handleActionModal} item={this.state.ticket} departments={this.state.departments} editButtonHandler={this.editButtonHandler}/>
            </div>
        )
    }
}
