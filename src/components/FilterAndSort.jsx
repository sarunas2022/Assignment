import React from 'react';
import { Button } from './Button';
import styles from './FilterAndSort.module.scss';

export const FilterAndSort = ({
    areaLessThanLT,
    filterByRegion,
    sortingPosts,
    selectedRegion,
    smallerThanLT,
    sort,
}) => {
    return (
        <div className={styles.filerAndSortContainer}>
            <div className={styles.buttonsContainer}>
                <div className={styles.filterButtons}>
                    <Button
                        text='Smaller than LT'
                        functionality={areaLessThanLT}
                        styling={
                            smallerThanLT ? 'outlinedButton' : 'containedButton'
                        }
                    />
                    <select
                        className={
                            selectedRegion === 'All regions'
                                ? styles.containedSelect
                                : styles.outlinedSelect
                        }
                        onChange={filterByRegion}
                        id='region'
                    >
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
                <Button
                    text={sort === 'ascending' ? 'Sort (Z-A)' : 'Sort (A-Z)'}
                    functionality={sortingPosts}
                    styling='outlinedButton'
                />
            </div>
        </div>
    );
};
