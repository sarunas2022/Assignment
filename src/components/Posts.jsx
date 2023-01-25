import React from 'react';
import styles from './Posts.module.scss';

export const Posts = ({ data, status }) => {
    if (status !== 'fulfilled') {
        return <h2>Loading</h2>;
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
