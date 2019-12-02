import React, { Component } from 'react';
import './RoleTile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCircle, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import withErrorHandler from '../../hoc/withErrorHandle/withErrorHandle'
import axios from 'axios'
import Multiselect from 'react-select';
import { connect } from 'react-redux'
import * as action from '../../store/action'

class RoleTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: { ...this.props.role }
        }
    }

    onSelect = (cate, read) => {
        const cateList = cate.map(cateogry => cateogry.value.split('/')[4]).join();
        this.setState((prevState) => {
            let newRole = { ...prevState.role }
            if (read)
                newRole.readCategories = cateList;
            else
                newRole.writeCategories = cateList;
            return { role: newRole };
        })
    }

    onChangeMembers = () => {
        this.setState((prevState) => {
            let newRole = { ...prevState.role }
            newRole.acceptMembers = !prevState.role.acceptMembers
            return { role: newRole };
        })
    }

    onChangeRoles = () => {
        this.setState((prevState) => {
            let newRole = { ...prevState.role }
            newRole.modifyRoles = !prevState.role.modifyRoles
            return { role: newRole };
        })
    }

    onChangeRank = (evt) => {
        console.log(evt.target);
        if (!evt.target.validity.valid)
            return;
        const value = evt.target.value
        this.setState((prevState) => {
            let newRole = { ...prevState.role }
            newRole.rank = value
            return { role: newRole };
        })
    }

    selectCategories = () => {
        return this.props.categories.map(category => {
            return {
                value: category.url, label: category.name
            }
        })
    }

    selectedCategories = (categoryStr) => {
        let urlsList = categoryStr.split(',')
        return this.props.categories.filter(category => urlsList.indexOf(category.url.split('/')[4]) >= 0).map(category => {
            return {
                value: category.url, label: category.name
            }
        })
    }

    render() {
        return (
            <div className='RoleTile'>
                <FontAwesomeIcon icon={faTimes} size="lg" className='LinkIcon' onClick={() => this.props.deleteRole(this.state.role)} />
                <p className="Header">{this.props.role.name}</p>
                <h3>Read Access:</h3>
                <Multiselect options={this.selectCategories()} value={this.selectedCategories(this.state.role.readCategories)} isMulti onChange={(p) => this.onSelect(p, true)} />
                <h3>Write Access:</h3>
                <Multiselect options={this.selectCategories()} value={this.selectedCategories(this.state.role.writeCategories)} isMulti onChange={(p) => this.onSelect(p, false)} />
                <div className='CheckBox'>
                    <FontAwesomeIcon icon={this.state.role.acceptMembers ? faCircle : faDotCircle} size="lg" onClick={this.onChangeMembers} />
                    Accept Members
                </div>
                <div className='CheckBox'>
                    <FontAwesomeIcon icon={this.state.role.modifyRoles ? faCircle : faDotCircle} size="lg" onClick={this.onChangeRoles} />
                    Modify Roles
                </div>
                <div className="row RankSelect">
                    <h5 className="col-6">Rank : </h5>
                    <input className="col-6" type="text" pattern="[0-9]*" onChange={this.onChangeRank.bind(this)} value={this.state.role.rank} />
                </div>
                <div className="row">
                    <button className='btn btn-primary col' onClick={() => this.props.updateRole(this.state.role)}>Save</button>
                    <button className='btn btn-secondary col' onClick={() => this.props.loadRoles()}>Reset</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        categories: state.categories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadCategories: () => dispatch(action.getCategories()),
        loadRoles: () => dispatch(action.getRoles()),
        updateRole: (role) => dispatch(action.updateRole(role)),
        deleteRole: (role) => dispatch(action.deleteRole(role))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(RoleTile, axios));