import React from 'react';
import { connect } from 'react-redux';
import { getLoggedIn } from '../store/user';
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
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  async handleSubmit(event) {
    event.preventDefault();
    const { data } = await axios.get(`/stocks/${this.state.ticker}`);

    this.setState({ stock: data['Global Quote'] });
  }
  async handleBuy(event) {
    event.preventDefault();
    const { data } = await axios.post('/stocks/buy', {
      ...this.state.stock,
      quantity: this.state.quantity
    });
  }
  render() {
    console.log(this.state.stock);
    return (
      <div>
        {' '}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="ticker">Ticker</label>
          <input
            type="text"
            name="ticker"
            value={this.state.ticker}
            onChange={this.handleChange}
          />
          <button type="submit"> Update</button>
        </form>
        {this.state.stock['01. symbol'] ? (
          <div>
            <p>{this.state.stock['01. symbol']}</p>
            <form onSubmit={evt => this.handleBuy(evt)}>
              <p>
                {(
                  Number(this.state.stock['05. price']) * this.state.quantity
                ).toFixed(2)}
              </p>
              <input
                type="number"
                name="quantity"
                value={this.state.quantity}
                onChange={this.handleChange}
              />
              <button type="submit"> Buy</button>
            </form>
          </div>
        ) : (
          ''
        )}
      </div>
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
    getUser: () => dispatch(getLoggedIn())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);
