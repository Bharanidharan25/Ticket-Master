import React, { Component } from 'react'
import axios from 'axios';
import{Table, Button} from 'react-bootstrap'
import CreateNewModal from './CreateNewModal'
import moment from 'moment'

export default class TicketsList extends Component {
    state={
        tickets:[],
        customers:[],
        departments:[],
        isCreateModalOpen:false,
        isActionModalOpen:false,
    }

    componentDidMount(){
        axios.get("http://localhost:3015/tickets")
        .then(response=>{
            this.setState({tickets:response.data});
        })
        .catch(err=>console.log(err))

        axios.get("http://localhost:3015/customers")
        .then(response=>{
            this.setState({customers:response.data})
        })
        .catch(err=>console.log(err))

        axios.get("http://localhost:3015/departments")
        .then(response=>{
            this.setState({departments:response.data})
        })
        .catch(err=>console.log(err))
    }
        


    handleCloseCreateModal = ()=>{
        this.setState({isCreateModalOpen:!this.state.isCreateModalOpen})
    }

    handleSubmit = (value)=>{
        axios.post("http://localhost:3015/tickets",{...value,isCompleted:false})
        .then(response=>{
            this.setState({tickets:[...this.state.tickets,response.data]})
        })
        .catch(err=>console.log(err))
        this.handleCloseCreateModal()
    }


    render() {
        return (
            <div>
                <div style={{display:'flex',justifyContent:'space-between', margin: '1rem'}}>
                    <h3>Tickets List</h3>
                    <Button variant='info' onClick={()=>this.handleCloseCreateModal()} >Add New</Button>
                </div>
                <Table responsive="xl" hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>ID</th>
                        <th>Created At</th>
                        <th>customer</th>
                        <th>department</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Assigned To</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tickets.map((ticket,index)=>{
                            return(
                                <tr key={ticket._id} onClick={()=>this.props.history.push(`/tickets/${ticket._id}`,{myProp:ticket})}>
                                    <td>{index+1}</td>
                                    <td className="tablecontent">{ticket.title}</td>
                                    <td className="tablecontent">{ticket.description}</td>
                                    <td>{ticket._id}</td>
                                    <td className="tablecontent">{moment(ticket.createdAt).format("llll")}</td>
                                    <td>{ticket.customer.name}</td>
                                    <td>{ticket.department.name}</td>
                                    <td className={ticket.priority}>{ticket.priority}</td>
                                    <td>{ticket.isCompleted?"completed":"pending"}</td>
                                    <td>{(ticket.employee)? ticket.employee.name :"Not Assigned"}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <CreateNewModal show={this.state.isCreateModalOpen} onHide={this.handleCloseCreateModal} customers ={this.state.customers} departments={this.state.departments}
                onSubmit = {this.handleSubmit}/>
            </div>
        )
    }
}
