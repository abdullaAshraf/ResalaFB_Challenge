import React, { Component } from 'react';
import './App.css';
import Posts from './containers/Posts/Posts'
import Roles from './containers/Roles/Roles'
import Users from './containers/Users/Users'
import Login from './containers/Login/Login'
import Layout from './hoc/Layout/Layout'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Role from './components/Role/Role'
import Post from './components/Post/Post'
import axios from 'axios'

class App extends Component {
  state = {
    currentUser: null,
    roles: [new Role('admin', true, true, 0), new Role('moderator', true, false, 1), new Role('volunteer', false, false, 2)],
    categories: ['All', 'New', 'Trash', 'Spam'],
    posts: [new Post('https://www.google.com/', 'test post', 'Random', Date.now()),
    new Post('https://www.linkedin.com', 'linkedin', 'Info', Date.now()),
    new Post('https://www.youtube.com/', 'another very cool post', 'Random', Date.now())]
  }

  config

  loadData = () => {
    /*
    axios.get('/Posts/', this.config)
      .then(res => this.setState({ posts: res.data }))
      .catch(err => console.log(err));

    axios.get('/Roles/', this.config)
      .then(res => this.setState({ Roles: res.data }))
      .catch(err => console.log(err));
    */
    let categories = this.state.posts.map(post => post.category).filter(onlyUnique);
    categories.push('All');
    categories.push('New');
    categories.push('Spam');
    categories.push('Trash');
    this.setState({
      categories: categories,
    });
  }

  componentDidMount() {
    this.loadData();
  }

  setUser = (user) => {
    this.setState({ currentUser: user });
    this.config = {
      headers: {
        //Authorization: "JWT " + user.token,
      }
    }
  }

  render() {

    let main = (
      <div className='row'>
        <div className='col-10'>
          <Posts posts={this.state.posts} categories={this.state.categories} roles={this.state.roles} activeUser={this.state.currentUser} />
        </div>
        <div className='col-2'>
          <Users />
        </div>
      </div>);

    return (
      <BrowserRouter>

        <div className="App">
          {this.currentUser == null ? <Redirect to="/login" /> : null}
          <Switch>
            <Route path="/login" exact render={() => <Login setUser={this.setUser} />} />
            <Layout>
              <Switch>
                <Route path="/roles" exact render={() => <Roles categories={this.state.categories} roles={this.state.roles} activeUser={this.state.currentUser} />} />
                <Route path="/" render={() => main} />
              </Switch>
            </Layout>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

