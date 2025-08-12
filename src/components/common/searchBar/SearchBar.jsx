import React, { useState, useEffect } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch, placeholder = 'Search products...' }) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(searchTerm);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm, onSearch]);

    return (
        <div className={styles.searchContainer}>
            <input
                name="search"
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
            />
            <span className={styles.searchIcon}>🔍</span>
            {searchTerm && (
                <button className={styles.clearButton} onClick={() => setSearchTerm('')}>×</button>
            )}
        </div>
    );
};

export default SearchBar;
