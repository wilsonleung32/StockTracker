import React from 'react';
import { Table } from 'semantic-ui-react';
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
    <Table.Row style={{ color }}>
      <Table.Cell>
        <p>{props.stock['01. symbol']}</p>
      </Table.Cell>
      <Table.Cell>
        <p>{props.stock.quantity}</p>
      </Table.Cell>
      <Table.Cell>
        <p>
          {(
            props.stock.quantity * parseFloat(props.stock['05. price'])
          ).toFixed(2)}
        </p>
      </Table.Cell>
    </Table.Row>
  );
};

export default Stocks;
