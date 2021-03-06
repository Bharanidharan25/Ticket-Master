import React from 'react';
import './App.css';
import {Link,BrowserRouter,Route,Switch} from 'react-router-dom';
import Home from './Components/Home'
import CustomersList from './Components/Customers/CustomersList';
import {Container, Navbar, Nav} from 'react-bootstrap';
import ListEmployee from './Components/Employee/listEmployee';
import TicketsList from './Components/Tickets/TicketsList';
import Ticket from './Components/Tickets/Ticket'

function App() {
  return (
    <div>
      <BrowserRouter>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
          <Navbar.Brand as={Link} to="/">Ticket Master</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to='/customers'>Customers</Nav.Link>
              <Nav.Link as={Link} to='/employees' >Deparments &amp; Employees</Nav.Link>
              <Nav.Link as={Link} to='/tickets' >Tickets</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>


        <Container className="themed-container">
          <Switch>
          <Route path='/' component={Home} exact={true}/>
          <Route path='/customers' component={CustomersList} exact={true}/>
          <Route path='/employees' component={ListEmployee} exact={true}/>
          <Route path='/tickets' component={TicketsList} exact={true}/>
          <Route path="/tickets/:id" component={Ticket}/>
          </Switch>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
