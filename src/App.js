import React from 'react';
import './App.css';
import {Link,BrowserRouter,Route,Switch} from 'react-router-dom';
import Home from './Components/Home'
import CustomersList from './Components/Customers/CustomersList';
import {Container, Navbar, Nav} from 'react-bootstrap';
import ListEmployee from './Components/Employee/listEmployee';

function App() {
  return (
    <div>
      <BrowserRouter>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">Ticket Master</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to='/' href='/' style={{textDecoration:'none', color:'#fff'}}>Home</Nav.Link>
              <Nav.Link as={Link} to='/customers' href='/customers' style={{textDecoration:'none', color:'#fff'}}>Customers</Nav.Link>
              <Nav.Link as={Link} to='/employees' href='/employees' style={{textDecoration:'none', color:'#fff'}}>Deparments &amp; Employees</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>


        <Container className="themed-container">
          <Switch>
          <Route path='/' component={Home} exact={true}/>
          <Route path='/customers' component={CustomersList} exact={true}/>
          <Route path='/employees' component={ListEmployee} exact={true}/>
          </Switch>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
