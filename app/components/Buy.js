import React from 'react';
import {
  Grid,
  Container,
  Form,
  Button,
  Header,
  Input
} from 'semantic-ui-react';
import { connect } from 'react-redux';

const Stocks = props => {
  const totalCost = (
    parseFloat(props.stock['05. price']) * props.quantity
  ).toFixed(2);
  return (
    <Container>
      <Header as="h1">{props.stock['01. symbol']}</Header>
      <p>{totalCost}</p>
      <Input
        type="number"
        name="quantity"
        value={props.quantity}
        onChange={props.handleChange}
      />
      <Button
        onClick={() => props.buy({ ...props.stock, quantity: props.quantity })}
        disabled={props.cash < totalCost}
      >
        Buy
      </Button>
    </Container>
  );
};

export default Stocks;
