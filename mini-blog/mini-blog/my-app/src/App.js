import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BlogService from './services/BlogService';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Login from './Login';
import Register from './components/Register';
import { Nav, Navbar } from 'react-bootstrap';
import Main from './components/Main'
import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons';
class App extends Component {

  async componentDidMount() {
    /* const response = await fetch('/api/blog/getAllPosts');
     const body = await response.json();
     console.log(JSON.stringify(body));
     this.setState({ posts: body, isLoading: false });*/
    
 }
  render() {

    return (
      <Router>

        {localStorage.getItem("authorization") == null ?  
        <div><Navbar bg="light" expand="lg">
          <Navbar.Collapse className="justify-content-end">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Login}></Route>
            <Route exact path='/register' component={Register}></Route>
          </Switch>
        </div></div>
        : <Main></Main>}
      </Router>
    );
  }

}

export default App;
