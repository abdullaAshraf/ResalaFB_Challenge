import React from 'react';
import './NavigationItems.css';
import {NavLink} from 'react-router-dom';

const navigationItems = () => (
    <ul className="NavigationItems">
        <NavLink to="/" exact>Posts</NavLink>
        <NavLink to="/roles">Roles</NavLink>
        <NavLink to="/login">Logout</NavLink>
    </ul>
);

export default navigationItems;