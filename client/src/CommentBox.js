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
    }
    
    componentDidMount() {
        this.__loadComments();
    }
    
    __loadComments(){
        this.setState({comments: []});
        
        axios.get(`http://localhost:3001/api/pets/${this.props.pet_id}/comments`)
        .then(response => {
          console.log(response);
          this.setState({
            comments: response.data
          });
        })
        .catch(error => console.log(error));
    }
    
    _handleCommentSubmit(comment) {
        this.props.comments.push({
            comments: comment
        });
        // comment.key = Math.random();
        this.setState({comments: this.state.comments.concat(comment)});
    }
    
    render() {
        return (
            
            <div className='commentBox'>
                <CommentForm onCommentSubmit={this._handleCommentSubmit.bind(this)}></CommentForm>
                <CommentList comments= {this.state.comments}></CommentList>
            </div>
        )
    }
}

export default CommentBox;