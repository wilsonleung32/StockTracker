import React from 'react';
import { Auth, Portfolio, Transaction } from './';
import { Switch, Route } from 'react-router-dom';

export default class Routes extends React.Component {
  constructor() {
    super();
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
