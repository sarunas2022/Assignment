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

    console.log(data);

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

    // Fetching data on page load
    useEffect(() => {
        fetchData();
    }, []);

    // get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPost = data.slice(indexOfFirstPost, indexOfLastPost);

    // change page

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
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
