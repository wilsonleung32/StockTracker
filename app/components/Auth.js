import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { login, signup } from '../store/user';
import { Redirect } from 'react-router-dom';
class Auth extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log(this.props.location.pathname);
    return (
      <div>
        {!this.props.user.email ? (
          <form
            onSubmit={event =>
              this.props.handleSubmit(event, this.props.location.pathname)
            }
          >
            <label htmlFor="email">Email</label>
            <input type="text" name="email" />
            <label htmlFor="password">password</label>
            <input type="password" name="password" />
            <button type="submit"> Update</button>
          </form>
        ) : (
          <Redirect to="/portfolio" />
        )}
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
    handleSubmit(evt, path) {
      evt.preventDefault();
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      if (path === '/login') dispatch(login({ email, password }));
      else dispatch(signup({ email, password }));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
