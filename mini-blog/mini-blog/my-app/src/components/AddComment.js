import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import BlogService from '../services/BlogService';
class AddComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentText: "",
            user: this.props.user,
            post: this.props.post
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeCommentText=this.handleChangeCommentText.bind(this);
    }
    handleChangeCommentText(event) {
        this.setState({ 
            commentText: event.target.value, 
            user: this.state.user, 
            post: this.state.post });
   
    }
    async handleSubmit(event) {
        const comment = {
            commentText: this.state.commentText,
            user: this.state.user,
            post: this.state.post,
            createdDate:new Date()
        }
        console.log(JSON.stringify(comment.user));
        BlogService.addComment(comment).then((res) => {
            this.setState({
                commentText: "",
                user: this.props.user,
                post: this.props.post
            });
            window.location.href="/";
        }, (error) => {
         console.log(error)
        });
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Control as="textarea" rows={1} placeholder="Enter your comment..." value={this.state.commentText} onChange={this.handleChangeCommentText} />
                    </Form.Group>
                    <Button variant="info" className="float-right" type="submit">Publish</Button>
                </Form>
            </div>
        );
    }
}
export default AddComment;