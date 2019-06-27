import React, { Component } from 'react';
import Comment from './Comment';


class CommentList extends Component {
    render() {
        const CommentNodes = this.props.comments.map((comment)=>{
            return (
                <Comment comment={comment.comment}>
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