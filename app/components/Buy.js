import React from 'react';
import { connect } from 'react-redux';
import { buyStockThunk } from '../store/stock';
import {
  Message,
  Input,
  Button,
  Transition,
  Container,
  Card
} from 'semantic-ui-react';
import axios from 'axios';

const centering = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '1em',
  width: '40vw'
};
class Buy extends React.Component {
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

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  async search() {
    try {
      const { data } = await axios.get(`/api/stocks/${this.state.ticker}`);
      this.setState({ stock: data['Global Quote'], error: false });
    } catch (error) {
      this.setState({ error: error });
    }
  }
  render() {
    const unitPrice = parseFloat(this.state.stock['05. price']).toFixed(2);
    const totalPrice = (unitPrice * this.state.quantity).toFixed(2);
    return (
      <Container style={centering}>
        <h1>Cash: ${this.props.user.cash.toFixed(2)}</h1>
        <Input
          placeholder="Ticker"
          name="ticker"
          type="string"
          value={this.state.ticker}
          onChange={this.handleChange}
        />
        <Button style={{ margin: '1em' }} onClick={this.search}>
          Search
        </Button>

        {this.state.error ? (
          <Message negative>
            <Message.Header>{this.state.error.message}</Message.Header>
            <p>{this.state.error.response.data}</p>
          </Message>
        ) : (
          <Transition
            visible={Boolean(this.state.stock['01. symbol'])}
            duration={750}
          >
            <Card>
              <Card.Content>
                {' '}
                Unit Price: ${unitPrice} Total: ${totalPrice}{' '}
              </Card.Content>
              <Card.Content>
                <Input
                  type="number"
                  name="quantity"
                  value={this.state.quantity}
                  onChange={this.handleChange}
                  min={1}
                />
                <Button
                  style={{ margin: '1em' }}
                  onClick={() =>
                    this.props.buyStock({
                      ...this.state.stock,
                      quantity: this.state.quantity,
                      totalPrice
                    })
                  }
                  disabled={
                    this.props.user.cash < totalPrice || this.state.quantity < 1
                  }
                >
                  Buy
                </Button>
              </Card.Content>
            </Card>
          </Transition>
        )}
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    buyStock: purchase => dispatch(buyStockThunk(purchase))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Buy);
