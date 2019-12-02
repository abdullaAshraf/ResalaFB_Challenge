import React, { Component } from 'react';
import PostsArea from '../../components/PostsArea/PostsArea';
import './Posts.css';
import CategoriesArea from '../../components/CategoriesArea/CategoriesArea'
import SearchBar from '../../components/SearchBar/SearchBar'
import PostDetails from '../PostDetails/PostDetails'
import withErrorHandler from '../../hoc/withErrorHandle/withErrorHandle'
import axios from 'axios'
import {connect} from 'react-redux'
import * as action from '../../store/action'

class Posts extends Component {
    state = {
        activeCategory: {url : 'https://resala-group.herokuapp.com/categories/1000/' , name : 'All'},
        searchQuery: '',
    }

    componentDidMount() {
        this.props.loadPosts();
        this.props.loadRoles();
        this.props.loadCategories();
    }

    matchCategory = (post, category) => {
        if (category.name === 'All')
            return !post.deleted;
        else if (category.name === 'New')
            return !post.seen;
        else if (category.name === 'Trash')
            return post.deleted;
        else
            return post.category === category.url;
    }

    updateCurrentPosts = (searchQuery, activeCategory) => {
        let curretPosts = [];
        this.props.posts.forEach(post => {
            if (this.matchCategory(post, activeCategory) && post.message.includes(searchQuery))
                curretPosts.push({ ...post });
        });
        return curretPosts;
    }

    updateActiveCategory = (category) => {
        this.setState({
            activeCategory: category
        });
    }

    onSearch = (query) => {
        this.setState({
            searchQuery: query
        });
    }

    render() {
        let curretPosts = this.updateCurrentPosts(this.state.searchQuery, this.state.activeCategory);
        let ViewArea = <PostsArea posts={curretPosts}/>;
        if (this.props.activePost != null)
            ViewArea = <PostDetails/>
        return (
            <div className='row'>
                <div className='col-3'>
                    <CategoriesArea activeCategory={this.state.activeCategory} updateActiveCategory={this.updateActiveCategory} />
                </div>
                <div className='col-9'>
                    <SearchBar onSearch={this.onSearch} />
                    {ViewArea}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser : state.currentUser,
        activePost : state.activePost,
        posts : state.posts,
        categories : state.categories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadPosts: () => dispatch(action.getPosts()),
        loadCategories: () => dispatch(action.getCategories()),
        loadRoles: () => dispatch(action.getRoles())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Posts,axios));