import React from 'react';
import styles from './Navigation.module.scss';
import PublicIcon from '@mui/icons-material/Public';

export const Navigation = () => {
    return (
        <div className={styles.navigationBar}>
            <PublicIcon fontSize='large' />
            <h1>World Countries</h1>
        </div>
    );
};
