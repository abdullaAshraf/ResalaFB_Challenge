import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { withRouter } from 'react-router-dom'
import "./Login.css";
import axios from 'axios'

class Login extends Component {
  state = {
    login: true,
    email: "",
    password: "",
    username: "",
  };

  componentDidMount() {
    this.props.setUser(null);
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
    if (this.state.login) {
      axios.post('/auth/jwt-api-token/', { password: this.state.password, username: this.state.username })
        .then(res => {
          console.log(res.body);
          this.props.setUser({ email: this.state.email, password: this.state.password, username: this.state.username, token: res.body })
        }
        )
        .catch(err => console.log(err));
    }
    axios.post('/auth/register/', { email: this.state.email, password: this.state.password, username: this.state.username })
      .then(res => {
        console.log(res.body);
        this.props.setUser({ email: this.state.email, password: this.state.password, username: this.state.username, token: res.body })
      }
      )
      .catch(err => console.log(err));
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

export default withRouter(Login);