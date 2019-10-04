import React from 'react';
import {
  Grid,
  Container,
  Form,
  Button,
  Header,
  Input
} from 'semantic-ui-react';

const Stocks = props => {
  console.log(props.stock);
  return (
    <Container>
      <Header as="h1">{props.stock['01. symbol']}</Header>
      <p>
        {(parseFloat(props.stock['05. price']) * props.quantity).toFixed(2)}
      </p>
      <Input
        type="number"
        name="quantity"
        value={props.quantity}
        onChange={props.handleChange}
      />
      <Button
        onClick={() => props.buy({ ...props.stock, quantity: props.quantity })}
      >
        Buy
      </Button>
    </Container>
  );
};

export default Stocks;
