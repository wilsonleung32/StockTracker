import React from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
class Navbar extends React.Component {
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
const mapStateToProps = state => {
  return {
    user: state.user,
    ownedStocks: state.ownedStocks
  };
};

export default connect(
  mapStateToProps,
  null
)(Navbar);
