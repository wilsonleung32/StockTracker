import React from 'react';

import { connect } from 'react-redux';
import { login, signup } from '../store/user';
import { Redirect } from 'react-router-dom';
import { Button, Form, Message } from 'semantic-ui-react';
class Auth extends React.Component {
  constructor() {
    super();
  }

  render() {
    const path = this.props.location.pathname;

    return !this.props.user.email ? (
      <Form
        className="login"
        onSubmit={event => this.props.handleSubmit(event, path)}
      >
        {path !== '/login' && (
          <Form.Field>
            <Form.Input placeholder="Name" name="name" type="string" />
          </Form.Field>
        )}
        <Form.Field>
          <Form.Input placeholder="Email" name="email" type="string" />
        </Form.Field>
        <Form.Field>
          <Form.Input placeholder="Password" name="password" type="password" />
        </Form.Field>
        <Button type="submit">{path === '/login' ? 'Login' : 'Sign Up'}</Button>
        {this.props.user.error && (
          <Message negative>
            <Message.Header>{this.props.user.error.message}</Message.Header>
            <p>{this.props.user.error.response.data}</p>
          </Message>
        )}
      </Form>
    ) : (
      <Redirect to="/" />
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

      if (path === '/login') {
        dispatch(login({ email, password }));
      } else {
        const name = evt.target.name.value;
        dispatch(signup({ email, password, name }));
      }
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
