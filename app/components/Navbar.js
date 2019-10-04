import React from 'react';

import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/logout">Logout</Link>
        </nav>
      </div>
    );
  }
}
