import React from 'react';
import { Table } from 'semantic-ui-react';
const getColor = (current, open) => {
  if (current === open) return 'grey';
  if (current < open) return 'red';
  return 'green';
};
const Stocks = props => {
  const color =
    props.color ||
    getColor(
      parseFloat(props.stock['05. price']),
      parseFloat(props.stock['02. open'])
    );
  const ticker = props.stock.ticker || props.stock['01. symbol'];
  const total =
    props.stock.totalPrice ||
    (props.stock.quantity * parseFloat(props.stock['05. price'])).toFixed(2);
  return (
    <Table.Row style={{ color }}>
      <Table.Cell>
        <p>{ticker}</p>
      </Table.Cell>
      <Table.Cell>
        <p>{props.stock.quantity}</p>
      </Table.Cell>
      <Table.Cell>
        <p>{total}</p>
      </Table.Cell>
    </Table.Row>
  );
};

export default Stocks;
