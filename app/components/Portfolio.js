import React from 'react';
import { connect } from 'react-redux';
import { getLoggedIn } from '../store/user';
import { getStocksThunk, buyStockThunk } from '../store/stock';
import { Stocks, Buy } from './';
import {
  Grid,
  Image,
  Form,
  Button,
  Header,
  Modal,
  Container
} from 'semantic-ui-react';
import axios from 'axios';
class Portfolio extends React.Component {
  constructor() {
    super();
    this.state = {
      ticker: '',
      stock: {},
      quantity: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getUser();
    this.props.getStocks();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  async handleSubmit(event) {
    event.preventDefault();
    const { data } = await axios.get(`/stocks/${this.state.ticker}`);

    this.setState({ stock: data['Global Quote'] });
  }
  render() {
    return (
      <Container>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              placeholder="Ticker"
              name="ticker"
              type="string"
              value={this.state.ticker}
              onChange={this.handleChange}
            />
            <Button type="submit">Search</Button>
          </Form>
          <Modal
            trigger={
              <Button disabled={!this.state.stock['01. symbol']}>
                Purchase
              </Button>
            }
          >
            <Modal.Content>
              <Buy
                stock={this.state.stock}
                buy={this.props.buyStock}
                cash={this.props.user.cash}
                quantity={this.state.quantity}
                handleChange={this.handleChange}
              />
            </Modal.Content>
          </Modal>
        </Container>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <h3>Ticker</h3>
            </Grid.Column>
            <Grid.Column>
              <h3>Shares</h3>
            </Grid.Column>
            <Grid.Column>
              <h3>Value</h3>
            </Grid.Column>
          </Grid.Row>
          {this.props.ownedStocks.map((stock, idx) => (
            <Stocks key={idx} stock={stock} />
          ))}
        </Grid>
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
    getStocks: () => dispatch(getStocksThunk()),
    buyStock: purchase => dispatch(buyStockThunk(purchase))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);
