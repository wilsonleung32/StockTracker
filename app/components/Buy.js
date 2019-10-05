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

const Buy = props => {
  const unitPrice = parseFloat(props.stock['05. price']).toFixed(2);
  const totalCost = (unitPrice * props.quantity).toFixed(2);
  return (
    <Container>
      <Header as="h1">{props.stock['01. symbol']}</Header>
      <Grid>
        <Grid.Row>
          <Grid.Column>Unit Price</Grid.Column>
          <Grid.Column>Total Cost</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>{unitPrice}</Grid.Column>
          <Grid.Column>{totalCost}</Grid.Column>
        </Grid.Row>
      </Grid>

      <Input
        type="number"
        name="quantity"
        value={props.quantity}
        onChange={props.handleChange}
        min={1}
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

export default Buy;
