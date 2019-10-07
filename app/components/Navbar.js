import React from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { logout } from '../store/user';
import { withRouter } from 'react-router';
class Navbar extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <h1 style={{ margin: '5px' }}>Stock Trader</h1>
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '10vh',
            margin: '1em'
          }}
        >
          <Link to="/">Home</Link>
          {!this.props.user.id ? (
            <React.Fragment>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link to="/portfolio">Portfolio</Link>
              <Link to="/transactions">Transactions</Link>
              <Button
                onClick={() => {
                  this.props.logout();
                  this.props.history.push('/');
                }}
              >
                Logout
              </Button>
            </React.Fragment>
          )}
        </nav>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
);
