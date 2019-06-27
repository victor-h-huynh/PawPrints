import React, { Component } from 'react';
import { marked } from 'marked';

class Comment extends Component {
    //Workaround from React protection from XRR attack. 
    rawMarkup() {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return { __html: rawMarkup };
    }
    
    render() {
        return (
            <div className='comment'>
                <h3 className='commentAuthor'>
                    {this.props.comments}
                </h3>
                
                <span dangerouslySetInnerHTML={this.rawMarkup()} className='commentBody'/>
            </div>
        );
    }
}

export default Comment;