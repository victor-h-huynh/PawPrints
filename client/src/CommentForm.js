import React, { Component } from 'react';

class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            author: '',
            txt: ''
        }

        this.handleAuthorChange = this.handleAuthorChange.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    handleAuthorChange(e) {
        this.setState({author: e.target.value});
    }

    handleTextChange(e) {
        console.log(e.target.value);
        this.setState({txt: e.target.value});
    }

    handleFormSubmit(e) {
        console.log(this.props)
        e.preventDefault();
        const author = this.props.current_user.name.trim();
        const txt = this.state.txt.trim();
        console.log(author, txt)

        this.props.onCommentSubmit({author: author, txt: txt, user_id: this.props.current_user.id});
    }

    render() {
        if (this.props.current_user) {
        return (
            <form className='commentForm' onSubmit={this.handleFormSubmit}>

                <div className="group">
                    <input type='text' className='input' value={this.state.txt} onChange={this.handleTextChange}/>
                    <span className="bar"></span>
                    <label className={this.state.txt.length > 0? "active": null}>Comment</label>
                </div>

                <input type='submit' value='Post'/>
            </form>
        );
    } else {
        return null;
    }}
}

export default CommentForm;