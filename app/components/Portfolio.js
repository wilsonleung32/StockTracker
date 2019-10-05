import React from 'react';
import { connect } from 'react-redux';
import { getLoggedIn } from '../store/user';
import { getStocksThunk, buyStockThunk } from '../store/stock';
import { Stocks, Buy } from './';
import {
  Grid,
  Message,
  Input,
  Button,
  Transition,
  Container,
  Table
} from 'semantic-ui-react';
import axios from 'axios';

const centering = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};
class Portfolio extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getUser();
    this.props.getStocks();
  }

  render() {
    return (
      <Container
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          width: '45vw'
        }}
      >
        <Table basic="very" style={{ margin: '2em' }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Ticker</Table.HeaderCell>
              <Table.HeaderCell>Shares</Table.HeaderCell>
              <Table.HeaderCell>Value</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.ownedStocks.map((stock, idx) => (
              <Stocks key={idx} stock={stock} />
            ))}
          </Table.Body>
        </Table>

        <Buy />
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    ownedStocks: state.ownedStocks
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(getLoggedIn()),
    getStocks: () => dispatch(getStocksThunk())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);
