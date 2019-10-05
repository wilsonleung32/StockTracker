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
        <h1>Stock Trader</h1>
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            width: '100%',
            height: '10vh',
            margin: '1em'
          }}
        >
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/transactions">Transactions</Link>
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
