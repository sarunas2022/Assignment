import React from 'react';
import styles from './Posts.module.scss';
import { CircularProgress } from '@mui/material';

export const Posts = ({ data, status }) => {
    if (status === 'loading') {
        return (
            <div className={styles.loader}>
                <CircularProgress />
            </div>
        );
    }
    return (
        <div className={styles.output}>
            <div className={styles.wrapper}>
                {data.map((country) => (
                    <div className={styles.card} key={country.name}>
                        <h2>{country.name}</h2>
                        <h5>{country.region}</h5>
                        <p>{country.area} km²</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
