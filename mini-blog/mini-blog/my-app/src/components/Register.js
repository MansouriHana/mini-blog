import React, { Component } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import BlogService from '../services/BlogService';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            firstName: "",
            lastName: "",
            password: ""
        };
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
    }
    handleChangeEmail(event) {
        this.setState({ username: event.target.value, firstName: this.state.firstName, lastName: this.state.lastName, password: this.state.password });
    }
    handleChangePassword(event) {
        this.setState({ username: this.state.username, firstName: this.state.firstName, lastName: this.state.lastName, password: event.target.value });
    }
    handleChangeFirstName(event) {
        this.setState({ username: this.state.username, firstName: event.target.value, lastName: this.state.lastName, password: this.state.password });
    }
    handleChangeLastName(event) {
        this.setState({ username: this.state.username, firstName: this.state.firstName, lastName: event.target.value, password: this.state.password });
    }
    async  handleSubmit(event) {
        const user={
            username:this.state.username,
            firstName:this.state.firstName,
            lastName: this.state.lastName,
            password:this.state.password
        }
      
        BlogService.addUser(user).then((res)=> {
            console.log(res.data);
            //localStorage.setItem("authorization", res.data.token);
           this.props.history.push('/');
        });
        event.preventDefault();
    }
    render() {
        return (
            <div>
                <Card className="login-form">
                    <Card.Header >Register</Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group as={Row} controlId="fromGroupEmail" >
                                <Col sm="2">
                                </Col>
                                <Form.Label column sm="2">E-mail address</Form.Label>
                                <Col sm="6">
                                    <Form.Control type="email" placeholder="Enter email" value={this.state.username.value} onChange={this.handleChangeEmail} />

                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col sm="2">
                                </Col>
                                <Form.Label column sm="2">FirstName</Form.Label>
                                <Col sm="6">
                                    <Form.Control type="text" placeholder="Enter your FirstName" value={this.state.firstName} onChange={this.handleChangeFirstName} />
                                </Col>

                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col sm="2">
                                </Col>
                                <Form.Label column sm="2">LastName</Form.Label>
                                <Col sm="6">
                                    <Form.Control type="text" placeholder="Enter your LastName" value={this.state.lastName} onChange={this.handleChangeLastName} />
                                </Col>

                            </Form.Group>
                            <Form.Group as={Row} controlId="fromGroupPassword" >
                                <Col sm="2">
                                </Col>
                                <Form.Label column sm="2">Password</Form.Label>
                                <Col sm="6">
                                    <Form.Control type="password" placeholder="Password" value={this.state.password.value} onClick={this.handleclickPassword} onChange={this.handleChangePassword} />

                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col sm="4">
                                </Col>
                                <Col sm="1">
                                    <Button type="submit">Register</Button>
                                </Col>
                                <Col sm="4">
                                </Col>


                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Register;