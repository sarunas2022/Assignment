import React, { useState } from 'react';
import styles from './Pagination.module.scss';

export const Pagination = ({
    postsPerPage,
    totalPosts,
    paginate,
    currentPage,
}) => {
    const pageNumbers = [];
    const [activePage, setActivePage] = useState('');
    console.log(currentPage);

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
                    <a className={styles.pageLink} href='!#'>
                        {number}
                    </a>
                </div>
            ))}
        </div>
    );
};
