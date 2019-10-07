import React from 'react';
import { Container, List } from 'semantic-ui-react';
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
      <h3>Instructions for Purchasing</h3>
      <List ordered>
        <List.Item>
          Search for a stock using its ticker.(An invalid ticker will result in
          an error message being displayed)
        </List.Item>
        <List.Item>
          Enter the number of stocks you want to buy. You must have enough funds
          to purchase stock.
        </List.Item>
        <List.Item>Click buy to complete your purchase</List.Item>
      </List>
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
