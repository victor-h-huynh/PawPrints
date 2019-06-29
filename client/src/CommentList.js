import React, { Component } from 'react';
import Comment from './Comment';

class CommentList extends Component {
    render() {
        let handleDelete = this.props.handleDelete;
        const CommentNodes = this.props.comments.map((comment, index)=>{
            return (
                <Comment comment={comment.comment} key={index} user={comment.user} users={this.props.users} keyValue={index} handleDelete={handleDelete}>
                </Comment>
            );
        });
        return (
            <div className='commentList'>
                <h2>Comments:</h2>
                {CommentNodes}
            </div>
        );
    }
}

export default CommentList;