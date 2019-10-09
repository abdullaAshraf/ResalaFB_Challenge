import React, { Component } from 'react';
import './RoleTile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes , faCircle , faDotCircle } from '@fortawesome/free-solid-svg-icons';
import Multiselect from 'react-select';

class roleTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: this.props.role
        }
    }

    onSelect = (cate, read) => {
        this.setState((prevState) => {
            let newRole = { ...prevState.role }
            if (read)
                newRole.readAcess = cate;
            else
                newRole.writeAcess = cate;
            return { role: newRole };
        })
    }

    onChangeMembers = () => {
        this.setState((prevState) => {
            let newRole = { ...prevState.role }
            newRole.acceptMember = !prevState.role.acceptMember
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

    selectCategories = () => {
        return this.props.categories.map(category => {
            return {
                value: category, label: category
            }
        })
    }

    render() {
        return (
            <div className='RoleTile'>
                <FontAwesomeIcon icon={faTimes} size="lg" className='LinkIcon' onClick={() => this.props.deleteRole(this.state.role)} />
                <p className="Header">{this.props.role.name}</p>
                <h3>Read Access:</h3>
                <Multiselect options={this.selectCategories()} value={this.state.role.readAcess} isMulti onChange={(p) => this.onSelect(p, true)} />
                <h3>Write Access:</h3>
                <Multiselect options={this.selectCategories()} value={this.state.role.writeAcess} isMulti onChange={(p) => this.onSelect(p, false)} />
                <div className='CheckBox'>
                    <FontAwesomeIcon icon={this.state.role.acceptMember ? faCircle : faDotCircle} size="lg" onClick={this.onChangeMembers} />
                    Accept Members
                </div>
                <div className='CheckBox'>
                    <FontAwesomeIcon icon={this.state.role.modifyRoles ? faCircle : faDotCircle} size="lg" onClick={this.onChangeRoles} />
                    Modify Roles
                </div>
                <button className='btn btn-primary' onClick={() => this.props.editRole(this.state.role)}>Save</button>
            </div>
        );
    }
}

export default roleTile;