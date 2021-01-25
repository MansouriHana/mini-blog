import React, { Component } from 'react';
import { Card, Nav, Navbar, NavDropdown, Form, Button, Container, Row, Col, ListGroup } from 'react-bootstrap';
import './main.css';
import CreatePost from './CreatePost';
import BlogService from '../services/BlogService';
import AddComment from './AddComment';
import Comments from './Comments';
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            posts: [],
            currentUser: {}
        };
        this.getCreatedDateTime = this.getCreatedDateTime.bind(this);
        this.logout = this.logout.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }
    async componentDidMount() {


        BlogService.getCurrentUser(localStorage.getItem("authorization")).then((res) => {
            console.log(res.data);
            this.setState({ isLoading: true, post: this.state.post, currentUser: res.data });

            BlogService.getAllPosts().then((res) => {
                this.setState({ posts: res.data, isLoading: false, currentUser: this.state.currentUser });

            });
        }, (res) => {
            console.log("here we have an error!!");
            localStorage.clear();
            this.props.history.push('/');
        });
        console.log(localStorage.getItem("authorization"));

    }
    getCreatedDateTime(createdDate) {

        var generatedDate = new Date(createdDate);
        console.log("currentdate ", new Date());
        console.log(generatedDate.getDate());
        var date = generatedDate.getFullYear() + '-' + (generatedDate.getMonth() + 1) + '-' + generatedDate.getDate();
        var time = generatedDate.getHours() + ":" + generatedDate.getMinutes() + ":" + generatedDate.getSeconds();
        var dateTime = date + ' ' + time;
        return dateTime;
    }
    logout() {
        localStorage.clear();
        window.location.href = "/";
    }
    deletePost(postId) {
        BlogService.deletePost(postId).then((res) => {
            console.log(res.data);
            window.location.href = "/";
        });
    }
    render() {
        const { posts, isLoading } = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        }
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#">AOSBook </Navbar.Brand>
                    <Nav className="ml-auto">
                        <NavDropdown title={this.state.currentUser.firstName} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={this.logout.bind(this)}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar>
                <CreatePost user={this.state.currentUser}></CreatePost>
                {posts.map((post) =>
                    <Card className="blog" key={post.id}>
                        <Card.Header>[{this.getCreatedDateTime(post.createdDate)}] <b>{post.user.firstName}</b> {post.user.username == this.state.currentUser.username ? <a href="" onClick={this.deletePost.bind(this, post.id)} className="float-right" id="delete-post">Delete</a> : null}</Card.Header>
                        <Card.Body>
                            <label>{post.postText}</label>
                            <hr />
                            <label><b>Comments</b></label>
                            <Comments userId={this.state.currentUser.username} postId={post.id}></Comments>


                            <AddComment user={this.state.currentUser} post={post}></AddComment>
                        </Card.Body>
                    </Card>
                )}

            </div>);
    }
}
export default Main;