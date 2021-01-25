import React, { Component } from 'react';
import {  ListGroup } from 'react-bootstrap';
import BlogService from '../services/BlogService';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.userId,
            postId: this.props.postId,
            comments: []
        }
        this.getCreatedDateTime=this.getCreatedDateTime.bind(this);
        this.deleteComment=this.deleteComment.bind(this);
    }
    async componentDidMount() {
        BlogService.getCommentByUserPost(this.state.postId).then((res) => {
            console.log(res.data);
            this.setState({
                userId: this.state.userId,
                postId: this.state.postId, 
                comments: res.data
            });
        });

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
    deleteComment(id){
        BlogService.deleteCommentById(id).then((res)=>{
            console.log(res.data);
         
        });
    }
    render() {
        let { comments } = this.state;
        return (
            <div>
                {
                    comments.map((comment) =>
                        <ListGroup key={comment.id}>
                            <ListGroup.Item variant="info" >
                                <b>{comment.user.lastName}: </b>{comment.commentText}<br />
                                <i>{this.getCreatedDateTime(comment.createdDate)}</i> -{comment.user.username == this.state.userId ? <a href="" onClick={this.deleteComment.bind(this,comment.id)}>Delete</a> : null}
                            </ListGroup.Item>
                            <br/>

                        </ListGroup>

                    )
                }
            </div>
        );
    }
}
export default Comments;