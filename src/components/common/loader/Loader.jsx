import React from 'react';
import styles from './Loader.module.css';

const Loader = ({ size = 'medium', color = '#3498db', className = '' }) => {
    const sizeClasses = {
        small: styles.small,
        medium: styles.medium,
        large: styles.large,
        xlarge: styles.xlarge
    };

    return (
        <div className={`${styles.loaderContainer} ${className}`}>
            <div
                className={`${styles.loader} ${sizeClasses[size]}`}
                style={{ borderColor: `${color} transparent transparent transparent` }}
            ></div>
        </div>
    );
};

export default Loader;
