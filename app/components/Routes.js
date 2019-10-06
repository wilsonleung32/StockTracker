import React from 'react';
import { Auth, Portfolio, Transaction } from './';
import { Switch, Route } from 'react-router-dom';
import { getLoggedIn } from '../store/user';
import { connect } from 'react-redux';
class Routes extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    return (
      <main>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Switch>
            <Route path="/login" component={Auth} />
            <Route path="/signup" component={Auth} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/transactions" component={Transaction} />
          </Switch>
        </div>
      </main>
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
)(Routes);
