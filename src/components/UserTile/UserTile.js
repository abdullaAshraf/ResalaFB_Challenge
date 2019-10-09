import React from 'react';
import './UserTile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faDotCircle } from '@fortawesome/free-solid-svg-icons';

const userTile = (props) => {
    let icon = <FontAwesomeIcon icon={faCircle} className='Online' />
    if (!props.connectivity)
        icon = <FontAwesomeIcon icon={faDotCircle} className='Offline' />
    return (
        <div className='UserTile row'>
            <div className='col-1'>
                {icon}
            </div>
            <div className='col-11'>
                <span>{props.username}</span>
                <p className='Email'>{props.email}</p>
            </div>
        </div>
    );
}

export default userTile;