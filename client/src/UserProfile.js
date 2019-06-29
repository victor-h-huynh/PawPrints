import React, { Component } from 'react';
import User from './User';

class UserProfile extends Component {

    getUser() {
        const id = Number(this.props.match.params.id);
        const users = this.props.users;
        const [user] = users.filter(user => user.id === id);
        return user;
    }

    render() {
        const user = this.getUser();
        const userThere = user ? <User user={user} updateNavState={this.props.updateNavState} /> : <div>Loading...</div>

        return (
          <div>
          {userThere}
          </div>
      );
    }
};

export default UserProfile;