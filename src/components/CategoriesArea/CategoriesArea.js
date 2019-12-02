import React, { Component } from 'react';
import Category from '../Category/Category';
import './CategoriesArea.css'
import Spinner from '../UI/Spinner/Spinner'
import { connect } from 'react-redux'

class categoriesArea extends Component {

    getReadCategories = () => {
        const rolesList = this.props.currentUser.roles.split(',');
        let categoriesList = []
        this.props.roles.forEach(role => {
            if (rolesList.indexOf(role.url.split('/')[4]) >= 0)
                categoriesList = categoriesList.concat(role.readCategories.split(','))
        });
        categoriesList = categoriesList.filter(onlyUnique);
        return categoriesList
    }

    render() {
        let readCategories = this.getReadCategories();
        let categories = <Spinner />
        if (this.props.categories.length > 0)
            categories = this.props.categories.filter(category => readCategories.indexOf(category.url.split('/')[4]) >= 0).map(category => <Category key={category.url} category={category} active={category.url === this.props.activeCategory.url} updateActiveCategory={this.props.updateActiveCategory} />);
        return (
            <div className='CategoriesArea'>
                {categories}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        categories: state.categories,
        roles: state.roles
    }
}

export default connect(mapStateToProps)(categoriesArea);

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
