import React, { Component } from 'react';
import './PostDetails.css';
import Multiselect from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import PostNote from '../../components/PostNote/PostNote'
import Shortid from 'short-id'
import withErrorHandler from '../../hoc/withErrorHandle/withErrorHandle'
import axios from 'axios'
import { connect } from 'react-redux'
import * as action from '../../store/action'

class PostDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            assignedRoles: props.post.assignedRoles == null ? [] : props.post.assignedRoles,
            notes: props.post.notes == null ? [] : props.post.notes,
            noteText: ''
        }
    }

    onRolesSelect = (roles) => {
        this.setState({
            assignedRoles: roles == null ? [] : roles.map(role => role.value)
        })
    }

    noteChanged = (e) => {
        this.setState({
            noteText: e.target.value
        })
    }

    addNote = () => {
        this.setState((prevState) => {
            return {
                notes: prevState.notes.concat({ text: prevState.noteText, user: this.props.currentUser }),
                noteText: ''
            }
        })
    }

    savePost = () => {
        let post = { ...this.props.post };
        post.assignedRoles = this.state.assignedRoles;
        post.notes = this.state.notes;
        this.props.updatePost(post);
    }

    render() {
        const rolesData = this.props.roles.map(role => { return { value: role.name, label: role.name } });
        const selectedRoles = this.state.assignedRoles.map(role => { return { value: role, label: role } });

        return (
            <div className='PostDetails'>
                <a href={this.props.post.link}><FontAwesomeIcon icon={faLink} size="lg" className='LinkIcon' /></a>
                <p>{this.props.post.updated_time}</p>
                <p className="Content">{this.props.post.message}</p>
                <hr></hr>
                <h3>Assigned Roles:</h3>
                <Multiselect options={rolesData} value={selectedRoles} isMulti onChange={this.onRolesSelect} />
                <hr></hr>
                <h3>Notes:</h3>
                {this.state.notes.length > 0 ? this.state.notes.map(note => <PostNote key={Shortid.generate()}  {...note} />) : <p>No notes yet.</p>}
                <textarea rows="2" onChange={this.noteChanged} value={this.state.noteText} />
                <button className="btn btn-dark" onClick={this.addNote}>Add Note</button>
                <hr></hr>
                <div className="row">
                    <button className="btn btn-primary col" onClick={this.savePost}>Save</button>
                    <button className="btn btn-dark col" onClick={this.props.exitPost}>Back</button>
                    <button className="btn btn-danger col" onClick={this.props.deletePost}>Delete Post</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        post: state.activePost,
        roles: state.roles,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deletePost: (post) => dispatch(action.deletePost(post)),
        exitPost: () => dispatch({ type: action.EXIT_POST }),
        updatePost: (post) => dispatch(action.updatePost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(PostDetails, axios));