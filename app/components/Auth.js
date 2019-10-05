import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { login, signup } from '../store/user';
import { Redirect } from 'react-router-dom';
import { Button, Checkbox, Form, Message } from 'semantic-ui-react';
class Auth extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log(this.props.user.error);
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
        {this.props.user.error ? (
          <Message negative>
            <Message.Header>{this.props.user.error.message}</Message.Header>
            <p>{this.props.user.error.response.data}</p>
          </Message>
        ) : (
          ''
        )}
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
