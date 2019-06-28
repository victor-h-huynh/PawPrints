import React, { Component } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import axios from "axios";

class CommentBox extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            comments: []
        };

        this.__loadComments = this.__loadComments.bind(this);
        this._handleCommentSubmit = this._handleCommentSubmit.bind(this);
    }
    
    componentDidMount() {
        this.__loadComments();
    }
    
    __loadComments(){
        this.setState({comments: []});
        
        axios.get(`http://localhost:3001/api/pets/${this.props.pet_id}/comments`)
        .then(response => {
          this.setState({
            comments: response.data
          });
        })
        .catch(error => console.log(error));
    }

    // _deleteComments() {

    // }

    _handleCommentSubmit(data) {
        axios.post(`http://localhost:3001/api/pets/${this.props.pet_id}/comments`, 
        data, {headers: {
            "Content-Type": "application/json"}}).then( (response) => {
                let newCommentState = this.state.comments
                newCommentState.push(response.data);
                console.log({response, newCommentState});
                this.setState({
                    comments: newCommentState
                });
            }).catch(function (error) {
                console.log(error);
            });
    }
    
    render() {
        return (
            
            <div className='commentBox'>
                <CommentForm onCommentSubmit={this._handleCommentSubmit} current_user={this.props.current_user} ></CommentForm>
                <CommentList comments={this.state.comments}></CommentList>
            </div>
        )
    }
}


export default CommentBox;