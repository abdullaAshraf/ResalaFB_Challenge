import React, { Component } from 'react';
import './App.css';
import Posts from './containers/Posts/Posts'
import Roles from './containers/Roles/Roles'
import Users from './containers/Users/Users'
import Login from './containers/Login/Login'
import Layout from './hoc/Layout/Layout'
import {Switch, Route, Redirect } from 'react-router-dom'

class App extends Component {
  render() {

    let main = (
      <div className='row'>
        <div className='col-10'>
          <Posts/>
        </div>
        <div className='col-2'>
          <Users />
        </div>
      </div>);

    return (
      <div className="App">
        {
          this.currentUser == null ? <Redirect to="/login" /> : null
        }
        <Switch>
          <Route path="/login" exact render={() => <Login setUser={this.setUser} />} />
          <Layout>
            <Switch>
              <Route path="/roles" exact render={() => <Roles/>} />
              <Route path="/" render={() => main} />
            </Switch>
          </Layout>
        </Switch>
      </div>
    );
  }
}

export default App;