import React from 'react';
import Button from './Button';

function Search (props) {
    return (
        <div>
            <h2>Search</h2>
            <input value={props.searchString} onChange={(e) =>props.handleSearchString(e.target.value)}/>
            <select value={props.searchCategory} onChange={(e) => props.handleSearchCategory(e.target.value)}>
                <option value=''>All Categories</option>
                <option value='camping'>Camping</option>
                <option value='candy'>Candy</option>
                <option value='clothing'>Clothing</option>
                <option value='shoes'>Shoes</option>
            </select>
            <Button handleClick={props.searchFn} text='Search'/>
        </div>
    );
};

export default Search;