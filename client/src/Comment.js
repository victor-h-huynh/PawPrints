import React, { Component } from 'react';

class Comment extends Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
      }
      handleDelete() {
        this.props.handleDelete(this.props.keyValue);
      }
    render() {
        return (
            <div className='comment'>
                   <h3 className='commentAuthor'>
                    {this.props.user.name}
                </h3>

                    {this.props.comment}

                {this.props.current_user && this.props.user.id === this.props.current_user.id &&
                <button type="button" className="delete-button" onClick={this.handleDelete}>Delete</button>}
            </div>
        );
    }
}

export default Comment;