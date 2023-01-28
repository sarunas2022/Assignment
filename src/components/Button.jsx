import React from 'react';
import styles from './Button.module.scss';

export const Button = ({ text, functionality, style }) => {
    return (
        <button onClick={functionality} className={styles.containedButton}>
            {text}
        </button>
    );
};
