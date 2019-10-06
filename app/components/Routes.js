import React from 'react';
import { Auth, Portfolio, Transactions, Home, NotFound } from './';
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
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Auth} />
            <Route path="/signup" component={Auth} />
            {this.props.user.id && (
              <React.Fragment>
                <Route path="/portfolio" component={Portfolio} />
                <Route path="/transactions" component={Transactions} />
              </React.Fragment>
            )}
            <Route component={NotFound} />
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
