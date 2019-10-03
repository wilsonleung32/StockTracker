import React from 'react';
import { Auth, Portfolio } from './';
import { Switch, Route } from 'react-router-dom';

export default class Routes extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Switch>
        <Route path="/login" component={Auth} />
        <Route path="/signup" component={Auth} />
        <Route path="/portfolio" component={Portfolio} />
      </Switch>
    );
  }
}
