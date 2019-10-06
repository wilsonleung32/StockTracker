import React from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
const Home = props => {
  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <h1>
        Welcome to Stock Trader,{' '}
        {props.user.name || 'please login/sign up to continue'}.
      </h1>
      <p>
        You can view buy stock, view your portfolio and view your past
        transactions.
      </p>
    </Container>
  );
};
const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(
  mapStateToProps,
  null
)(Home);
