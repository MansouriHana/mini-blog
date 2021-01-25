import axios from 'axios';
const API_BASE_URL = "http://localhost:8080/api/";
class BlogService {
    getAllPosts() {
        return axios.get(API_BASE_URL + "blog/getAllPosts", {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {}
        });
    }
    createPost(post) {
        return axios.post(API_BASE_URL + "blog/addPost", post, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    deletePost(postId) {
        return axios.delete('/api/blog/deletePost/' + postId);
    }
    authentication(user) {
        return axios.post(API_BASE_URL + "auth/authenticate", user, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
    addUser(user) {
        return axios.post(API_BASE_URL + "auth/register", user, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
    
    getCurrentUser(token) {
        return axios.get(API_BASE_URL + "auth/currentUser/" + token, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {}
        });
    }
    addComment(comment) {
        console.log(JSON.stringify(comment));
        return axios.post(API_BASE_URL + "blog/addComment", comment, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
    getCommentByUserPost( postId) {
        return axios.get(API_BASE_URL + "blog/userComments/" + postId, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {}
        });
    }
    deleteCommentById(id) {
        return axios.delete(API_BASE_URL + "blog/deleteComment/" + id,{
            headers: {
                'Content-Type': 'application/json',
            },
            data: {}
        });
    }
    deletePost(postId){
        return axios.delete(API_BASE_URL + "blog/deletePost/" + postId,{
            headers: {
                'Content-Type': 'application/json',
            },
            data: {}
        });
    }
}
export default new BlogService();