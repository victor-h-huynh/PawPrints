import React, { Component } from 'react';
import { marked } from 'marked';

class Comment extends Component {
    //Workaround from React protection from XRR attack. 
    
    render() {
        return (
            <div className='comment'>
                <h3 className='commentAuthor'>
                    {this.props.comment}
                </h3>
            </div>
        );
    }
}

export default Comment;