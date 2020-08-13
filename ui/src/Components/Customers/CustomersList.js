import React, { Component } from 'react'
import axios from 'axios'
import ModalComponent from './Modal'
import {Button,ButtonGroup,Card,Spinner } from 'react-bootstrap'
import profileImg from '../Images/profile.png'
import Swal from 'sweetalert2'

export default class CustomersList extends Component {

    state={
        customers: null,
        isModalOpen: false,
        modalType:'',
        customerToShow:{}
    }

    componentDidMount(){
        axios.get('http://localhost:3015/customers')
        .then(response => {
           if(response.status === 200){
               this.setState({customers:response.data})
           }else {
               alert('Error in API request')
           }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    createNewCustomer = (formData) => {
        axios.post('http://localhost:3015/customers', formData)
        .then(response => {
           if(response.status === 200){
               const customers= [...this.state.customers]
               customers.push(response.data)
               this.setState({customers, isModalOpen:false})
               Swal.fire(
                'Success',
                'Record created successfully',
                'success'
                )
           }else {
                Swal.fire(
                    'Error..!',
                    'Error in creating record',
                    'error'
                )
           }
        })
        .catch(err=>{
            Swal.fire(
                'Error..!',
                'Error in creating record',
                'error'
            )
        })
    }

    deleteCustomer = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          })
          .then((result) => {
            if (result.value) {
                axios.delete(`http://localhost:3015/customers/${id}`)
                .then(response =>{
                    if(response.status === 200){
                        const customers = this.state.customers.filter(customer => customer._id !== id)
                        this.setState({customers})
                        Swal.fire(
                            'Deleted!',
                            'Record is Deleted',
                            'success'
                        )
                    }else{
                        Swal.fire(
                            'Error..!',
                            'Error in deleting record',
                            'error'
                        )
                        alert('Error in deleting record')
                    }
                })
                .catch(err=> alert(err))
            }
          })
    }

    editCustomer = (formData) => {
        axios.put(`http://localhost:3015/customers/${formData._id}`, {name:formData.name, email:formData.email, mobile: formData.mobile})
        .then(response => {
           if(response.status === 200){
                let customers= [...this.state.customers]
                customers = customers.map(customer => {
                    if(customer._id === formData._id) customer = {...response.data}
                    return customer
                })
                this.setState({customers, isModalOpen:false})
                Swal.fire(
                    'Updated!',
                    'Record is Updated',
                    'success'
                )
           }else {
                Swal.fire(
                    'Error..!',
                    'Error in Updating Record',
                    'error'
                )
           }
        })
        .catch(err=>{
            Swal.fire(
                'Error..!',
                'Error in Updating Record',
                'error'
            )
        })
    }

    render() {
        return (
            this.state.customers ?
            <div>
                <div style={{display:'flex',justifyContent:'space-between', margin: '1rem'}}>
                    <h2>Customers List</h2>
                    <Button variant='info' onClick={()=>this.setState({isModalOpen:true, customerToShow:{}, modalType: 'new'})} >New</Button>
                </div>
                <b style={{margin: '1rem'}}>Total Number of Customers : </b>{this.state.customers.length}
                {this.state.customers.length>0 && 
                    <div className='cardList'>
                    {this.state.customers.map((customer) => {
                    return(
                        <Card key={customer._id} className='card'>
                            <a 
                                href='# '
                                 onClick={(e)=> {
                                    e.preventDefault(); 
                                    this.setState({isModalOpen:true, modalType: 'info', customerToShow: customer})
                                }}
                                className='customerInfo'
                            >
                                <i style={{fontSize:'20px',position:'absolute',right:0,margin:'1rem'}}className="fa fa-info-circle" aria-hidden="true" />
                            </a>
                            <Card.Img variant="top" src={profileImg} style={{width: '10rem', margin:'auto'}}/>
                            <Card.Body>
                            <Card.Title>{customer.name}</Card.Title>
                            <Card.Text>
                                <b>Email: </b>{customer.email}<br/>
                                <b>Mobile: </b>{customer.mobile}
                            </Card.Text>
                            <ButtonGroup>
                            <Button 
                                variant="primary" 
                                onClick={(e)=> {
                                    e.preventDefault()
                                    this.setState({isModalOpen:true, modalType: 'edit', customerToShow: customer})
                                }}
                            >Edit</Button>
                            <Button variant="danger" onClick={(e)=> {e.preventDefault(); this.deleteCustomer(customer._id)}}>Delete</Button>
                            </ButtonGroup>
                            </Card.Body>
                        </Card>
                        )
                    })}
                    </div>
                }
                <ModalComponent createNewCustomer={this.createNewCustomer} editCustomer={this.editCustomer} customer={this.state.customerToShow} type={this.state.modalType} show={this.state.isModalOpen} hide={()=>{this.setState({isModalOpen:false})}}/>
            </div> :
            <Spinner animation="border" role="status" style={{position:'absolute', top: '50%', left:'48%'}}>
                <span className="sr-only">Loading...</span>
            </Spinner>
        )
    }
}

