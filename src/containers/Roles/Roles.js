import React, { Component } from 'react';
import RoleTile from '../RoleTile/RoleTile';
import './Roles.css';
import Shortid from 'short-id'

class Roles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roles: props.roles,
            activeUser: props.activeUser,
            categories: props.categories
        };
    }

    editRole = (newRole) => {
        //TODO update role
        this.setState((prevState) => {
            let newRoles = prevState.roles.map(role => { return { ...role } });
            newRoles.map(role => {
                if (role.name === newRole.name)
                    return newRole;
                else
                    return { ...role };
            });
            return {
                roles: newRoles
            }
        })
    }

    deleteRole = (newRole) => {
        this.setState((prevState) => { prevState.rolesfilter(role => role.name !== newRole.name) });
    }

    render() {
        return (
            <div>
                {this.state.roles.map(role => <RoleTile key={Shortid.generate()} role={role} categories={this.state.categories} deleteRole={this.deleteRole} editRole={this.editRole} />)}
            </div>
        );
    }
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}


export default Roles;