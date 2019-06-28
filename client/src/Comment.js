import React, { Component } from 'react';

class Comment extends Component {
    
    render() {
        return (
            <div className='comment'>
                    {this.props.comment}
                    
                <h3 className='commentAuthor'>
                    {this.props.user.name}
                </h3>
            </div>
        );
    }
}

export default Comment;