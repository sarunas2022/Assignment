import './App.scss';
import React, { useState, useEffect } from 'react';
import { Posts } from './components/Posts';
import { Pagination } from './components/Pagination';

function App() {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState('idle');
    // for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(20);

    // for sorting
    const [sort, setSort] = useState('ascending');

    // getting data from API
    const fetchData = async () => {
        try {
            setStatus('loading');
            const data = await fetch(
                'https://restcountries.com/v2/all?fields=name,region,area'
            );
            const response = await data.json();
            setData(response);

            setStatus('fulfilled');
        } catch (err) {
            console.log(err);
            setStatus('rejected');
        }
    };

    // function to sort post ascending or descending alphabetically
    const sortingPosts = () => {
        if (sort === 'Descending') {
            setSort('ascending');
            data.sort((a, b) => {
                if (a.name < b.name) return -1;
                return 1;
            });
        } else {
            console.log('clicked');
            setSort('Descending');
            data.sort((a, b) => {
                if (a.name > b.name) return -1;
                return 1;
            });
        }
    };
    // Sorting ascending

    // Sorting Descending

    // Fetching data on page load
    useEffect(() => {
        fetchData();
    }, []);

    // get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPost = data.slice(indexOfFirstPost, indexOfLastPost);

    // change page - function passed down as props to pagination.jsx, returns
    // value of click event as pageNumber and its used sets CurrentPage

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className='ButtonsContainer'>
                <div className='filterButtons'>
                    <button>Smaller Then LT</button>
                    <button>Oceanic region</button>
                </div>
                <div className='sortingButtons'>
                    <button onClick={() => sortingPosts()}>
                        {sort === 'ascending' ? 'Sort (Z-A)' : 'Sort (A-Z)'}
                    </button>
                </div>
            </div>
            <Posts data={currentPost} status={status} />
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={data.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </>
    );
}

export default App;
