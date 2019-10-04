import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

const Stocks = props => {
  return (
    <Grid.Row>
      <Grid.Column>
        <p>{props.stock['01. symbol']}</p>
      </Grid.Column>
      <Grid.Column>
        <p>{props.stock.quantity}</p>
      </Grid.Column>
      <Grid.Column>
        <p>
          {(
            props.stock.quantity * parseFloat(props.stock['05. price'])
          ).toFixed(2)}
        </p>
      </Grid.Column>
    </Grid.Row>
  );
};

export default Stocks;
