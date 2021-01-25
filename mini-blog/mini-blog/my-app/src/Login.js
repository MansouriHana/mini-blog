import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import './login.css';
import BlogService from './services/BlogService';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: { value: '', isShow: false },
            password: { value: '', isShow: false },
            errorrMessage: false
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleclickEmail = this.handleclickEmail.bind(this);
        this.handleclickPassword = this.handleclickPassword.bind(this);
    }
    handleChangeEmail(event) {
        this.setState({ email: { value: event.target.value, isShow: true }, password: this.state.password, errorrMessage: this.state.errorrMessage });
    }
    handleChangePassword(event) {
        this.setState({ email: this.state.email, password: { value: event.target.value, isShow: this.state.password.isShow }, errorrMessage: this.state.errorrMessage });
    }
    handleclickEmail() {
        this.setState({ email: { value: this.state.email.value, isShow: true }, password: { value: this.state.password.value, isShow: false }, errorrMessage: this.state.errorrMessage });
    } n
    handleclickPassword() {
        this.setState({ email: { value: this.state.email.value, isShow: false }, password: { value: this.state.password.value, isShow: true }, errorrMessage: this.state.errorrMessage });
    }
    async handleSubmit(event) {
        console.log('Email : ' + this.state.email.value);
        console.log('Password : ' + this.state.password.value);
        this.setState({ email: { value: '', isShow: false }, password: { value: '', isShow: false } });
        const user = {
            username: this.state.email.value,
            password: this.state.password.value
        }

        BlogService.authentication(user).then((res) => {
            console.log(res.data);
            localStorage.setItem("authorization", res.data.token);
            window.location.href = "/";
        }, (res) => {
            console.log(res)
            this.setState({
                email: this.state.email,
                password: this.state.password,
                errorrMessage: true
            });
        });
        event.preventDefault();
    }

    render() {
        return (
            <div className="login-form">
                <Card>
                    <Card.Header >Login</Card.Header>
                    <Card.Body>{
                        this.state.errorrMessage == true ?
                            <div className="erro-msg">
                                <Alert variant="danger" >Oops, somthing wasn't right!</Alert>
                            </div> : null}

                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group as={Row} controlId="fromGroupEmail" >
                                <Col sm="2">
                                </Col>
                                <Form.Label column sm="2">E-mail address</Form.Label>
                                <Col sm="6">
                                    <Form.Control type="email" placeholder="Enter email" value={this.state.email.value} onClick={this.handleclickEmail} onChange={this.handleChangeEmail} />
                                    {this.state.email.isShow ? <FontAwesomeIcon className="fa-user" icon={faUser} color="blue" /> : null}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="fromGroupPassword" >
                                <Col sm="2">
                                </Col>
                                <Form.Label column sm="2">Password</Form.Label>
                                <Col sm="6">
                                    <Form.Control type="password" placeholder="Password" value={this.state.password.value} onClick={this.handleclickPassword} onChange={this.handleChangePassword} />
                                    {this.state.password.isShow ? <FontAwesomeIcon className="fa-password" icon={faLock} color="blue" /> : null}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Col sm="4">
                                </Col>
                                <Col sm="8">
                                    <Form.Check type="checkbox" label="Remember Me" />
                                </Col>

                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col sm="4">
                                </Col>
                                <Col sm="1">
                                    <Button type="submit">login</Button>
                                </Col>
                                <Col sm="4">
                                    <a href="#">Forgot your Password?</a>
                                </Col>


                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </div>

        );
    }
}
export default Login;