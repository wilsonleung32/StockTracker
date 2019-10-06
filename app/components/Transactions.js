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
import { Stocks, AllStocks } from './';
// import stock from '../store/stock';
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
      //   <Table basic="very">
      //     <Table.Header>
      //       <Table.Row>
      //         <Table.HeaderCell>Ticker</Table.HeaderCell>
      //         <Table.HeaderCell>Shares</Table.HeaderCell>
      //         <Table.HeaderCell>Value</Table.HeaderCell>
      //       </Table.Row>
      //     </Table.Header>
      //     <Table.Body>
      //       {this.state.transactions.map(stock => (
      //         <Stocks key={stock.id} stock={stock} color="black" />
      //       ))}
      //     </Table.Body>
      //   </Table>
      <AllStocks stocks={this.state.transactions} color="black" />
    );
  }
}
