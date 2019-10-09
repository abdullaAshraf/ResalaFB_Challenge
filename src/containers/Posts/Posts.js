import React, { Component } from 'react';
import PostsArea from '../../components/PostsArea/PostsArea';
import './Posts.css';
import CategoriesArea from '../../components/CategoriesArea/CategoriesArea'
import SearchBar from '../../components/SearchBar/SearchBar'
import PostDetails from '../../components/PostDetails/PostDetails'

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: props.posts,
            activeCategory: 'All',
            curretPosts: [],
            searchQuery: '',
            activePost: null,
            categories: props.categories,
            roles: props.roles,
            activeUser: props.activeUser
        }
    }

    componentDidMount() {
        this.updateCurrentPosts(this.state.searchQuery, this.state.activeCategory);
    }

    onSearch = (query) => {
        this.updateCurrentPosts(query, this.state.activeCategory);
        this.setState({
            searchQuery: query
        });
    }

    matchCategory = (post, category) => {
        if (category === 'All')
            return true;
        else if (category === 'New')
            return !post.seen;
        else if (category === 'Trash')
            return post.deleted;
        else
            return post.category === category;
    }

    updateCurrentPosts = (searchQuery, activeCategory) => {
        let curretPosts = [];
        this.state.posts.forEach(post => {
            if (this.matchCategory(post, activeCategory) && post.content.includes(searchQuery))
                curretPosts.push({ ...post });
        });
        this.setState({
            curretPosts: curretPosts
        });
    }

    updateActiveCategory = (category) => {
        this.updateCurrentPosts(this.state.searchQuery, category);
        this.setState({
            activeCategory: category
        });
    }

    openPost = (postLink) => {
        //TODO update seen
        let post = { ...this.state.curretPosts.filter(post => post.link === postLink)[0] };
        this.setState({ activePost: post });
    }

    exitPost = () => {
        this.setState({ activePost: null });
    }

    deletePost = () => {
        //TODO update deleted
        this.setState({ activePost: null });
    }

    addNote = (note) => {
        //TODO update notes
        //TODO fill user
        this.setState((prevState) => {
            let newPost = { ...this.state.activePost };
            newPost.notes.push({ text: note, user: 'Me' });
            return {
                activePost: newPost
            }
        })
    }

    onRolesSelect = (roles) => {
        //TODO update assigned roles;
        this.setState((prevState) => {
            let newPost = { ...this.state.activePost };
            newPost.assignedRoles = roles.map(role => role.value);
            return {
                activePost: newPost
            }
        })
    }

    render() {

        let ViewArea = <PostsArea posts={this.state.curretPosts} openPost={this.openPost} />;
        if (this.state.activePost != null)
            ViewArea = <PostDetails post={this.state.activePost} roles={this.state.roles} exitPost={this.exitPost} deletePost={this.deletePost} addNote={this.addNote} onRolesSelect={this.onRolesSelect} />

        return (
            <div className='row'>
                <div className='col-3'>
                    <CategoriesArea categories={this.state.categories} activeCategory={this.state.activeCategory} updateActiveCategory={this.updateActiveCategory} />
                </div>
                <div className='col-9'>
                    <SearchBar onSearch={this.onSearch} />
                    {ViewArea}
                </div>
            </div>
        );
    }
}

export default Posts;