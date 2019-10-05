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
  Modal,
  Container
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
    this.state = {
      ticker: '',
      stock: {},
      quantity: 1,
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }
  componentDidMount() {
    this.props.getUser();
    this.props.getStocks();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  async search() {
    try {
      const { data } = await axios.get(`/stocks/${this.state.ticker}`);
      this.setState({ stock: data['Global Quote'], error: false });
    } catch (error) {
      console.log('herrrreee');
      this.setState({ error: error });
    }
  }
  render() {
    return (
      <Container>
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

            <Grid.Column width={3}>
              <Input
                placeholder="Ticker"
                name="ticker"
                type="string"
                value={this.state.ticker}
                onChange={this.handleChange}
              />
              <Button onClick={this.search}>Search</Button>
              <Modal trigger={<Button>Open</Button>}>
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

              {this.state.error ? (
                <Message negative>
                  <Message.Header>{this.state.error.message}</Message.Header>
                  <p>{this.state.error.response.data}</p>
                </Message>
              ) : (
                ''
              )}
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
