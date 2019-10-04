import React from 'react';
import { Grid } from 'semantic-ui-react';
const getColor = (current, open) => {
  if (current === open) return 'grey';
  if (current < open) return 'red';
  return 'green';
};
const Stocks = props => {
  const color = getColor(
    parseFloat(props.stock['05. price']),
    parseFloat(props.stock['02. open'])
  );

  return (
    <Grid.Row style={{ color }}>
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
