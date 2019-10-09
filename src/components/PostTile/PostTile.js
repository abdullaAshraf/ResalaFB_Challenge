import React from 'react';
import './PostTile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

const postTile = (props) => {
    return (
        <div className = 'PostTile' onClick = {() => props.openPost(props.post.link)}>
            <a href={props.post.link}><FontAwesomeIcon icon={faLink} size="lg" className='LinkIcon' /></a>
            <p>{props.post.getEditDate()}</p>
            <p className="Content">{props.post.getShortContent()}</p>
            <p>{props.post.seen ? "Seen" : "New"}</p>
        </div>
    );
}

export default postTile;