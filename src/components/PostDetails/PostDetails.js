import React from 'react';
import './PostDetails.css';
import Multiselect from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink} from '@fortawesome/free-solid-svg-icons';
import PostNote from '../PostNote/PostNote'
import Shortid from 'short-id'

const postDetails = (props) => {
    let rolesData = props.roles.map(role => {
        return {
            value: role.name, label: role.name
        }
    });

    let selectedRoles = props.post.assignedRoles.map(role => {
        return {
            value: role, label: role
        }
    });

    console.log(selectedRoles);

    const onChange = selectedOptions => {
        props.onRolesSelect(selectedOptions);
    }

    let notes = props.post.notes.map(note => <PostNote key={Shortid.generate()}  {...note} />);
    let noteText = '';

    const noteChanged = (e) => {
        noteText = e.target.value;
    }

    return (
        <div className='PostDetails'>
            <a href={props.post.link}><FontAwesomeIcon icon={faLink} size="lg" className='LinkIcon' /></a>
            <p>{props.post.getEditDate()}</p>
            <p className="Content">{props.post.content}</p>
            <hr></hr>
            <h3>Assigned Roles:</h3>
            <Multiselect options={rolesData} value={selectedRoles} isMulti onChange={onChange} />
            <hr></hr>
            <h3>Notes:</h3>
            {notes.length > 0 ? notes : <p>No notes yet.</p>}
            <textarea rows="2" onChange={noteChanged}/>
            <div className="row">
                <button className="btn btn-primary col" onClick={() => props.addNote(noteText)}>Send</button>
                <button className="btn btn-dark col" onClick={props.exitPost}>Back</button>
                <button className="btn btn-danger col" onClick={props.deletePost}>Delete Post</button>
            </div>
        </div>
    );
}
export default postDetails;