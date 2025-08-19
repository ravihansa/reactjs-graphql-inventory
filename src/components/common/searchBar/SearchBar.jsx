import React, { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch, placeholder = 'Search products...' }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const handleClear = () => {
        setSearchTerm('');
        onSearch('');
    };

    return (
        <div className={styles.searchContainer}>
            <input
                name="search"
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleInputChange}
                className={styles.searchInput}
            />
            <span className={styles.searchIcon}>🔍</span>
            {searchTerm && (
                <button
                    className={styles.clearButton}
                    onClick={handleClear}
                    type="button"
                    aria-label="Clear search"
                >
                    ×
                </button>
            )}
        </div>
    );
};

export default SearchBar;
