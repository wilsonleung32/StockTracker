import React from 'react';
import { Table } from 'semantic-ui-react';
import { Stocks } from './';

const AllStocks = props => {
  return (
    <Table basic="very">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Ticker</Table.HeaderCell>
          <Table.HeaderCell>Shares</Table.HeaderCell>
          <Table.HeaderCell>Value</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.stocks.map((stock, idx) => (
          <Stocks
            key={stock.id || idx}
            stock={stock}
            color={props.color || undefined}
          />
        ))}
      </Table.Body>
    </Table>
  );
};

export default AllStocks;
