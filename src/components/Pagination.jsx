import React from 'react';
import styles from './Pagination.module.scss';

export const Pagination = ({
    postsPerPage,
    totalPosts,
    paginate,
    currentPage,
}) => {
    const pageNumbers = [];

    // getting number of pages
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className={styles.pagination}>
            {pageNumbers.map((number) => (
                <div
                    onClick={() => paginate(number)}
                    className={
                        currentPage === number
                            ? styles.currentPageNumberBox
                            : styles.pageNumberBox
                    }
                    key={number}
                >
                    {number}
                </div>
            ))}
        </div>
    );
};
