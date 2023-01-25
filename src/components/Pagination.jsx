import React from 'react';
import styles from './Pagination.module.scss';

export const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className={styles.pagination}>
            {pageNumbers.map((number) => (
                <div
                    onClick={() => paginate(number)}
                    className={styles.pageNumber}
                    key={number}
                >
                    <a className={styles.pageLink} href='!#'>
                        {number}
                    </a>
                </div>
            ))}
        </div>
    );
};
