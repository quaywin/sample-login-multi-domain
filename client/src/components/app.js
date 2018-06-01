import React, { Component } from 'react';
import { getUser } from '../actions/index';
import MainPage from '../containers/page';

export default class App extends Component {
  render() {
    return (
      <MainPage/>
    );
  }
}
