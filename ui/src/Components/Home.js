import React from 'react'
import Chart from "react-google-charts";
import axios from 'axios';
import {Spinner} from 'react-bootstrap'

class Home extends React.Component {
    state={
        tickets:[],
        departments:[],
        employees:[]
    }

    componentDidMount(){
        axios.get('http://localhost:3015/tickets')
        .then(response => {
            this.setState({tickets:response.data})
        })
        .catch(err => console.log(err))

        axios.get('http://localhost:3015/departments')
        .then(response=>{
            this.setState({departments:response.data})
        })
        .catch(err=> console.log(err))

        axios.get('http://localhost:3015/employees')
        .then(response=>{
            this.setState({employees:response.data})
        })
        .catch(err=> console.log(err))
    }

    computeBarChartData(){
        let dataObject={}
        this.state.departments.map(department=>{
            if (!dataObject[department.name]) dataObject[department.name] = {high:0,medium:0,low:0}
            return null
        })
        this.state.tickets.map(ticket=>{
            dataObject[ticket.department.name][ticket.priority] +=1
            return null
        })
        let data = [
            ['Department', 'High', 'Medium', 'Low'],
        ]
        for (let dept in dataObject){
            data.push([dept,dataObject[dept].high,dataObject[dept].medium,dataObject[dept].low])
        }
        return data
    }

    computePieChart = ()=>{
        let data={}
        this.state.employees.map(emp => {
            data[emp.department.name]>=0 ? data[emp.department.name] += 1 : data[emp.department.name] = 1
            return null
        })
        const result=[
            ['Department','No. of Employees']
        ]
        for (let dept in data){
            result.push([dept,data[dept]])
        }
        return result
    }

    render(){
        return (
            <div className='chartDiv'>
                {this.state.tickets.length>0 && this.state.departments.length>0 && <Chart
                chartType="Bar"
                loader={<div className='chartLoader'><Spinner animation="grow" /></div>}
                data={this.computeBarChartData()}
                options={{
                    // Material design options
                    chart: {
                    title: 'Ticket Data',
                    subtitle: 'Department and prirority wise Chart',
                    },
                }}
                // For tests
                className='chart'
                />}

                {this.state.employees.length>0 && this.state.departments.length>0 && <Chart
                chartType="PieChart"
                loader={<div className='chartLoader'><Spinner animation="grow" /></div>}
                data={this.computePieChart()}
                options={{
                    title: 'Employee Data',
                    // Just add this option
                    is3D: true,
                }}
                className='chart'
                />}
            </div>
        )}
}

export default Home