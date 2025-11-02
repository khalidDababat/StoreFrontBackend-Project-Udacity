import React from 'react';
import './SearchInput.scss';
import { FaSearch } from 'react-icons/fa';

const SearchInput = () => {
    return (
        <div className="search">
            <div>
                <FaSearch />
            </div>
            <input type="text" placeholder="    Search Product" />
        </div>
    );
};

export default SearchInput;
