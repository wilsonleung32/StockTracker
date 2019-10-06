import React from 'react';
import { connect } from 'react-redux';
import { getStocksThunk } from '../store/stock';
import { Buy, AllStocks } from './';
import { Container } from 'semantic-ui-react';

class Portfolio extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getStocks();
  }

  render() {
    return (
      <Container
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          width: '100%'
        }}
      >
        <AllStocks stocks={this.props.ownedStocks} />
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
    getStocks: () => dispatch(getStocksThunk())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);
