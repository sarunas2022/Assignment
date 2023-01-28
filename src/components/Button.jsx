import React from 'react';
import styles from './Button.module.scss';

export const Button = ({ text, functionality, styling }) => {
    return (
        <button onClick={functionality} className={styles[styling]}>
            {text}
        </button>
    );
};
