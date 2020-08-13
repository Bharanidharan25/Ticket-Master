import React, { Component } from 'react'
import CreatableSelect from 'react-select/creatable'
import axios from 'axios'
import {Button,Spinner,ButtonGroup,Card } from 'react-bootstrap'
import profileImg from '../Images/profile.png'
import Swal from 'sweetalert2'
import EmployeeModal from './EmployeeModal'

export default class ListEmployee extends Component {

    state={
        departments:[],
        employees:[],
        isModalOpen: false,
        modalType:'',
        options:[],
        currentDepartment: null,
        employeeToShow:{}
    }

    componentDidMount(){
        const promise1 = axios.get('http://localhost:3015/departments')
        const promise2 = axios.get('http://localhost:3015/employees')

        Promise.all([promise1,promise2])
        .then(response=>{
            const departments = response[0].data
            const employees = response[1].data
            const options = departments.map(department => {
                return {label: department.name, value: department._id}
            })
            this.setState({departments,employees,options:[{label:'All',value:'all'}, ...options],currentDepartment:{label:'All', value:'all'}})
        })
        .catch(err=> console.log(err))
    }

    handleChange = (newValue) => {
        if(newValue && newValue.__isNew__){
            axios.post('http://localhost:3015/departments', {name:newValue.value})
            .then(response=>{
                if(response.status === 200){
                    const departments = [...this.state.departments, response.data]
                    const options = [...this.state.options, {value: response.data._id, label: response.data.name}]
                    this.setState({options, departments})
                }else{
                    alert('Error in creating department')
                }
            })
            .catch(err=> console.log(err))
        }

        this.setState({currentDepartment: newValue})
    }

    createNewEmployee = (formData) => {
        axios.post('http://localhost:3015/employees', formData)
        .then(response => {
            if(response.status === 200){
                console.log(response.data)
                const employees= [...this.state.employees,{...response.data,department:this.state.departments.find(department=>{
                    return department._id === response.data.department
                })}]
                this.setState({employees, isModalOpen:false})
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

    deleteEmployee=(employee)=>{
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
                axios.delete(`http://localhost:3015/employees/${employee._id}`)
                .then(response => {
                    if(response.status === 200){
                        const employees= this.state.employees.filter(employee=> employee._id !== response.data._id)
                        this.setState({employees})
                        Swal.fire(
                        'Success',
                        'Record deleted successfully',
                        'success'
                        )
                    }else {
                        Swal.fire(
                            'Error..!',
                            'Error in deleting record',
                            'error'
                        )
                    }
                })
                .catch(err=>{
                    Swal.fire(
                        'Error..!',
                        'Error in deleting record',
                        'error'
                    )
                })
            }
        })
    }

    render(){
    const employeesToDisplay = this.state.currentDepartment ? 
        this.state.employees.filter(employee=>(employee.department._id === this.state.currentDepartment.value)||this.state.currentDepartment.value==='all')
        : []
    return (
        this.state.options.length > 0 ? 
        <div>
            <div style={{margin: '1rem'}}>
                <h2>Departments &amp; Employees List</h2>
            </div>
            <div style={{display:'flex',justifyContent:'space-between', margin: '1rem'}}>
                <CreatableSelect
                    isClearable
                    value={this.state.currentDepartment}
                    placeholder='Select or Create a Department...'
                    className='creatableSelect'
                    onChange={this.handleChange}
                    options={this.state.options}
                />
                <Button variant='info' onClick={()=>this.setState({isModalOpen:true, employeeToShow:{}, modalType: 'new'})}>New</Button>
            </div>
            <b style={{margin: '1rem'}}>Total Number of Employees : </b>{employeesToDisplay.length}
            <div className='cardList'>
                {this.state.currentDepartment && 
                    employeesToDisplay.map(employee=>{
                    return(
                        <Card key={employee._id} className='card'>
                            <a 
                                href='# '
                                className='customerInfo'
                                onClick={(e) => {
                                    e.preventDefault(); 
                                    this.setState({isModalOpen:true, modalType: 'info', employeeToShow: employee})
                                }}
                            >
                                <i style={{fontSize:'20px',position:'absolute',right:0,margin:'1rem'}}className="fa fa-info-circle" aria-hidden="true" />
                            </a>
                            <Card.Img variant="top" src={profileImg} style={{width: '10rem', margin:'auto'}}/>
                            <Card.Body>
                            <Card.Title>{employee.name}</Card.Title>
                            <Card.Text>
                                <b>Department: </b>{employee.department.name}<br/>
                                <b>Email: </b>{employee.email}<br/>
                                <b>Mobile: </b>{employee.mobile}
                            </Card.Text>
                            <ButtonGroup>
                            <Button 
                                variant="primary" 
                            >Edit</Button>
                            <Button variant="danger" onClick={(e)=>{e.preventDefault(); this.deleteEmployee(employee)}}>Delete</Button>
                            </ButtonGroup>
                            </Card.Body>
                        </Card>
                        )
                    })}
                </div>
                <EmployeeModal departments={this.state.departments} employee={this.state.employeeToShow} type={this.state.modalType} show={this.state.isModalOpen} createNewEmployee={this.createNewEmployee} hide={()=>{
                    console.log('closing modal')
                    this.setState({isModalOpen:false})
                }}/>
            </div> :
            <Spinner animation="border" role="status" style={{position:'absolute', top: '50%', left:'48%'}}>
                <span className="sr-only">Loading...</span>
            </Spinner>
    );
    }
}
