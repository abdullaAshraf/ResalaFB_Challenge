import React from 'react';
import './Category.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faTrash, faEye, faAsterisk, faTag } from '@fortawesome/free-solid-svg-icons';

const category = (props) => {
    let classes = ['CategoryItem','row'];
    if (props.active)
        classes.push('CategoryActive')

    let icon = faTag;
    if (props.name === 'All')
        icon = faAsterisk;
    else if (props.name === 'Trash')
        icon = faTrash;
    else if (props.name === 'New')
        icon = faEye;
    else if (props.name === 'Spam')
        icon = faExclamationTriangle;
        
    return (
        <div className={classes.join(' ')} onClick={() => props.updateActiveCategory(props.name)}>
            <FontAwesomeIcon icon={icon} className='CategoryIcon col-3' />
            <span className='col-9'>{props.name}</span>
        </div>
    );
}

export default category