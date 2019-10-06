import React from 'react';

import {
  Table,
  Message,
  Input,
  Button,
  Transition,
  Container
} from 'semantic-ui-react';
import axios from 'axios';

const centering = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};
export default class Transactions extends React.Component {
  constructor() {
    super();
    this.state = {
      transactions: []
    };
  }
  async componentDidMount() {
    const { data } = await axios.get('/stocks/transactions');
    this.setState({ transactions: data });
  }

  render() {
    return (
      <Table basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Ticker</Table.HeaderCell>
            <Table.HeaderCell>Shares</Table.HeaderCell>
            <Table.HeaderCell>Total Cost</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.state.transactions.map(transaction => (
            <Table.Row key={transaction.id}>
              <Table.Cell>{transaction.ticker}</Table.Cell>
              <Table.Cell>{transaction.quantity}</Table.Cell>
              <Table.Cell>{transaction.totalPrice}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}
