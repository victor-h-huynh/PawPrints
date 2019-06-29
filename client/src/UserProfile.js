import React, { Component } from 'react';
import User from './User';
import NoMatch from './NoMatch';

class UserProfile extends Component {

    getUser() {
        const id = Number(this.props.match.params.id);
        const users = this.props.users;
        const [user] = users.filter(user => user.id === id);
        return user;
    }

    render() {
        const user = this.getUser();

        return (
        <React.Fragment>
          {user ? (
              <User user={user} updateNavState={this.props.updateNavState} />
          ) : (
            <NoMatch/>
          )}
        </React.Fragment>
      );
    }
};

export default UserProfile;