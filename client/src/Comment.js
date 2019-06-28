import React, { Component } from 'react';

class Comment extends Component {
    
    render() {
        return (
            <div className='comment'>
                <h3 className='commentAuthor'>
                    {this.props.comment}
                </h3>
                <button type="button">🗑</button>
            </div>
        );
    }
}

export default Comment;