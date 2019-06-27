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
        e.preventDefault();
        const author = this.state.author.trim();
        const txt = this.state.txt.trim();
        if(!txt || !author) return;
        
        this.props.onCommentSubmit({author: author, txt: txt});
        this.setState({author: "", txt: ""});
    }
    
    render() {
        return (
            <form className='commentForm' onSubmit={this.handleFormSubmit}>
                <div className="group">
                    <input type='text' className='input' value={this.state.author} onChange={this.handleAuthorChange}/>
                    <span className="bar"></span>
                    <label className={this.state.author.length > 0? "active": null}>Name</label>
                </div>
                    
                <div className="group">
                    <input type='text' className='input' value={this.state.txt} onChange={this.handleTextChange}/>
                    <span className="bar"></span>
                    <label className={this.state.txt.length > 0? "active": null}>Comment</label>
                </div>
                
                <input type='submit' value='Post'/>
            </form>
        );
    }
}

export default CommentForm;