import React, { Component } from 'react';
import RoleTile from '../RoleTile/RoleTile';
import './Roles.css';
import withErrorHandler from '../../hoc/withErrorHandle/withErrorHandle'
import axios from 'axios'
import { connect } from 'react-redux'
import * as action from '../../store/action'

class Roles extends Component {

    state = {
        newRoleName: ''
    }

    componentDidMount() {
        this.props.loadRoles();
        this.props.loadCategories();
    }

    nameChanged = (e) => {
        this.setState({
            newRoleName: e.target.value
        })
    }

    addRole = () => {
        this.props.addRole(this.state.newRoleName);
        this.setState({
            newRoleName: ''
        })
    }

    getCurrUserRank = () => {
        const rolesList = this.props.currentUser.roles.split(',');
        let rank = 0
        this.props.roles.forEach(role => {
            if (rolesList.indexOf(role.url.split('/')[4]) >= 0)
                rank = Math.max(rank, role.rank)
        });
        return rank
    }

    render() {
        return (
            <div>
                {this.props.roles.filter(role => role.rank <= this.getCurrUserRank()).map(role => <RoleTile key={role.url} role={role} />)}
                <input className="MainInput" type="text" onChange={this.nameChanged} value={this.state.newRoleName} />
                <button className="btn btn-primary" onClick={this.addRole}>Add Role</button>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        roles: state.roles,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadCategories: () => dispatch(action.getCategories()),
        loadRoles: () => dispatch(action.getRoles()),
        addRole: (role) => dispatch(action.addRole(role))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Roles, axios));