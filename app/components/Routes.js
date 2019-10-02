import React from 'react';
import { Auth } from './';
import { Switch, Route } from 'react-router-dom';

export default class Routes extends React.Component {
  constructor() {
    super();
  }
  render() {
    return <Route path="/login" component={Auth} />;
  }
}
