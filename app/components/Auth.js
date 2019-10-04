import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { login, signup } from '../store/user';
import { Redirect } from 'react-router-dom';
import { Button, Checkbox, Form } from 'semantic-ui-react';
class Auth extends React.Component {
  constructor() {
    super();
  }

  render() {
    return !this.props.user.email ? (
      <Form
        className="login"
        onSubmit={event =>
          this.props.handleSubmit(event, this.props.location.pathname)
        }
      >
        <Form.Field>
          <Form.Input placeholder="Email" name="email" type="string" />
        </Form.Field>
        <Form.Field>
          <Form.Input placeholder="password" name="password" type="password" />
        </Form.Field>
        <Button type="submit">Login</Button>
      </Form>
    ) : (
      <Redirect to="/portfolio" />
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
