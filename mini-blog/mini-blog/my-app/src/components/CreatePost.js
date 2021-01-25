import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import BlogService from '../services/BlogService';
class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
                postText: "",
                user: this.props.user
                
        }
        this.handleAddPost = this.handleAddPost.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
    }
    async componentDidMount() { 
        console.log(this.state.user)
    }
    async handleAddPost(event) {
        let post = {
            postText:this.state.postText,
            createdDate: new Date(), 
            user:this.state.user   
        }
        BlogService.createPost(post).then((res)=>{
            console.log(res.data);
            this.setState({postText:"",user:this.state.user})
            window.location.href="/";
        });
        event.preventDefault();
    }
    handleChangeText(event) {
        this.setState({ postText: event.target.value });
    }
    render() {
        //console.log(this.state.post.currentDateTime);
        return (
            <div>
                <Card className="blog">
                    <Card.Header>Hi {this.state.user.firstName}, What's new ?</Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.handleAddPost}>
                            <Form.Group>
                                <Form.Control as="textarea" rows={1} value={this.state.postText} onChange={this.handleChangeText} />
                            </Form.Group>
                            <Button variant="info" className="float-right" type="submit">publish</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>

        );
    }
}
export default CreatePost;