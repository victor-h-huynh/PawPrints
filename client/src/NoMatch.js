import React, { Component } from 'react';
import { Link } from 'react-router-dom'


function NoMatch({ location }) {
    return (
      <div>
        <h3>
          No match for <code>{location.pathname}</code>. Please return to the <Link to="/">Homepage</Link>
        </h3>
      </div>
    );
  }

   export default NoMatch;