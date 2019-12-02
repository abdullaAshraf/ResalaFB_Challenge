import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';

const searchBar = (props) => {
    let searchQuery = '';

    const onValueChange = (event) => {
        searchQuery = event.target.value;
    }

    const onListenForEnter = (e) => {
        if(e.which === 13){
            props.onSearch(searchQuery)
        }
    }

    return (
        <div className='SearchBar'>
            <input onChange={onValueChange} onKeyPress={onListenForEnter}></input>
            <button onClick={() => props.onSearch(searchQuery)}><FontAwesomeIcon icon={faSearch} className='SearchIcon' /></button>
        </div>

    );
}

export default searchBar