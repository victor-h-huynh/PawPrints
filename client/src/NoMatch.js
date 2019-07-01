import React from 'react';
import { Link } from 'react-router-dom';


function NoMatch({ location }) {
    return (
      <div className="NoMatch">
        <h3>
          Sorry, this page doesn't exist. Please return to the <Link to="/">Homepage</Link>
        </h3>
      </div>
    );
  }

export default NoMatch;