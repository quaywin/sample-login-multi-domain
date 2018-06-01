import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser, logout } from '../actions/index';
class LoginForm extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  onUsernameChange(event) {
    this.setState({
      username: event.target.value
    })
  }

  onPasswordChange(event) {
    this.setState({
      password: event.target.value
    })
  }

  onFormSubmit(event){
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.props.loginUser(username, password);
  }

  render () {
    const { data, status } = this.props;
    return (
      <div>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <div className="form-group">
            <label>Account:</label>
            <input type="text" className="form-control" 
              value={this.state.username}
              onChange={this.onUsernameChange.bind(this)}/>
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" className="form-control" 
              value={this.state.password}
              onChange={this.onPasswordChange.bind(this)}/>
          </div>
          <button type="submit" className="btn btn-default">Login</button>

          { !status && data &&
            <p style={{'color': 'red'}}>{ data.error }</p>
          }
        </form>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  data: state.auth.data,
  status: state.auth.status,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginUser, logout }, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps)(LoginForm);