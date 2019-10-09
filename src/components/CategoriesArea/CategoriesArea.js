import React from 'react';
import Category from '../Category/Category';
import './CategoriesArea.css'

const categoriesArea = (props) => {
    return (
        <div className = 'CategoriesArea'>
            {props.categories.map(category => <Category key={category} name={category} active = {category === props.activeCategory} updateActiveCategory = {props.updateActiveCategory}/>)}
        </div>
    );
}

export default categoriesArea;