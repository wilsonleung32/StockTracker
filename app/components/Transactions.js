import React from 'react';
import axios from 'axios';
import { AllStocks } from './';

export default class Transactions extends React.Component {
  constructor() {
    super();
    this.state = {
      transactions: []
    };
  }
  async componentDidMount() {
    const { data } = await axios.get('/api/stocks/transactions');
    this.setState({ transactions: data });
  }

  render() {
    return <AllStocks stocks={this.state.transactions} color="black" />;
  }
}
