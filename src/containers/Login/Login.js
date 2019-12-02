import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { withRouter } from 'react-router-dom'
import "./Login.css";
import withErrorHandler from '../../hoc/withErrorHandle/withErrorHandle'
import axios from 'axios'
import { connect } from 'react-redux'
import * as action from '../../store/action'


class Login extends Component {
  state = {
    login: true,
    email: "",
    password: "",
    username: "",
  };

  componentDidMount() {
    this.props.logout();
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.login) 
      this.props.login();
    else
      this.props.register();
    this.props.history.push('/');
  }

  toggleLogin = () => {
    this.setState((prevState) => {
      return {
        login: !prevState.login
      }
    });
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          {this.state.login ? null : <FormGroup controlId="username" bsSize="large">
            <FormLabel>Username</FormLabel>
            <FormControl
              value={this.state.username}
              onChange={this.handleChange}
              type="text"
            />
          </FormGroup>}
          <FormGroup controlId="email" bsSize="large">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            {this.state.login ? "Login" : "Apply"}
          </Button>
        </form>
        <span onClick={this.toggleLogin}>{this.state.login ? "Register instead" : "Login instead"}</span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      currentUser: state.currentUser,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      login: (user) => dispatch(action.login(user)),
      logout: () => dispatch(action.logout()),
      register: (user) => dispatch(action.register(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withRouter(Login), axios));