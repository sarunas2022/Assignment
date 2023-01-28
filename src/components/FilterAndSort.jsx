import React from 'react';
import styles from './FilterAndSort.module.scss';

export const FilterAndSort = ({
    areaLessThanLT,
    filterByRegion,
    sortingPosts,
    sort,
}) => {
    return (
        <div className={styles.buttonsContainer}>
            <div className={styles.filterButtons}>
                <button onClick={areaLessThanLT}>Smaller than Lithuania</button>
                <div className={styles.regionContainer}>
                    <label for='region'>Choose a region:</label>
                    <select onChange={filterByRegion} id='region'>
                        <option value='All regions'>All regions</option>
                        <option value='Africa'>Africa</option>
                        <option value='Americas'>Americas</option>
                        <option value='Antarctic Ocean'>Antarctic Ocean</option>
                        <option value='Asia'>Asia</option>
                        <option value='Europe'>Europe</option>
                        <option value='Oceania'>Oceania</option>
                        <option value='Polar'>Polar</option>
                    </select>
                </div>
            </div>
            <div className={styles.sortingButtons}>
                <button onClick={sortingPosts}>
                    {sort === 'ascending' ? 'Sort (Z-A)' : 'Sort (A-Z)'}
                </button>
            </div>
        </div>
    );
};
