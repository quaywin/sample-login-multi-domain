import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, logout, setCrossStorage, CLIENT_DOMAIN } from '../actions/index';
import LoginForm from './login_form';
const CrossStorageHub = require('cross-storage').CrossStorageHub;
const CrossStorageClient = require('cross-storage').CrossStorageClient;

class MainPage extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const self = this;
    const { storage } = this.props;
    if(window.location.host == CLIENT_DOMAIN){
      storage.onConnect().then(function () {
        return storage.get('token')
      })
      .then(function (token) {
        if (token && token !== 'null') {
          localStorage.setItem('token', token);
          self.props.getUser();
        } else {
          localStorage.clear('token');
          self.props.logout();
        }
      }).catch(function () {
        self.props.logout();
      });
    } else {
      self.props.getUser();
    }
  }
  onLogout() {
      this.props.logout();
  } 
  render() {
    const { data, status, check } = this.props;
    return (
      <div>
        { status && data &&
          <div>
            <p>Login Successfully!!!</p>
            <p>Name: { data.name }</p>
            <button className="btn btn-default" onClick={this.onLogout.bind(this)}>Logout</button>
          </div>
        } 
        { !status && check &&
          <LoginForm/>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.auth.data,
  status: state.auth.status,
  check: state.auth.check,
  storage: state.auth.storage
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUser, logout, setCrossStorage }, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps)(MainPage);