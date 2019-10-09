import React from 'react';
import './PostNote.css';

const postNote = (props) => {
    return (
        <div className = 'PostNote'>
            <p className="Content">{props.text}</p>
            <p>{props.user}</p>
        </div>
    );
}

export default postNote;