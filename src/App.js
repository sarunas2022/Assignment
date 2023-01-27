import './App.scss';
import React, { useState, useEffect } from 'react';
import { Posts } from './components/Posts';
import { Pagination } from './components/Pagination';

function App() {
    // for data fetching and status
    const [data, setData] = useState([]);
    const [status, setStatus] = useState('idle');
    // for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(20);
    // for sorting
    const [sort, setSort] = useState('ascending');
    // for filtering by region- store the selected region option value
    const [selectedRegion, setSelectedRegion] = useState('All regions');
    const [smallerThanLT, setSmallerThanLT] = useState(false);
    const [filteredData, setFilteredData] = useState('');
    console.log(filteredData);
    // Fetching data on page load
    useEffect(() => {
        // getting data from API
        const fetchData = async () => {
            try {
                setStatus('loading');
                const data = await fetch(
                    'https://restcountries.com/v2/all?fields=name,region,area'
                );
                const response = await data.json();
                setData(response);
                console.log(response);

                setStatus('fulfilled');
            } catch (err) {
                console.log(err);
                setStatus('rejected');
            }
        };
        fetchData();
    }, []);

    // function to sort post ascending or descending alphabetically
    const sortingPosts = () => {
        // checking if data was filtered if not sorting data array
        if (selectedRegion === 'All regions' && !smallerThanLT) {
            if (sort === 'Descending') {
                setSort('ascending');
                data.sort((a, b) => {
                    if (a.name < b.name) return -1;
                    return 1;
                });
            } else {
                setSort('Descending');
                data.sort((a, b) => {
                    if (a.name > b.name) return -1;
                    return 1;
                });
            }
        } else {
            if (sort === 'Descending') {
                setSort('ascending');
                filteredData.sort((a, b) => {
                    if (a.name < b.name) return -1;
                    return 1;
                });
            } else {
                setSort('Descending');
                filteredData.sort((a, b) => {
                    if (a.name > b.name) return -1;
                    return 1;
                });
            }
        }
        // after sorting sets back current page to the first one
        setCurrentPage(1);
    };

    // onChange sets region value to state to enable filtering posts by region
    const filterByRegion = (event) => {
        setSelectedRegion(event.target.value);
    };
    // onClicks  filtering posts by area < Lithuania
    const areaLessThanLT = () => {
        !smallerThanLT ? setSmallerThanLT(true) : setSmallerThanLT(false);
    };

    // all filters
    useEffect(() => {
        let filteredData = [...data];
        if (selectedRegion !== 'All regions') {
            filteredData = filteredData.filter(
                (country) => country.region === selectedRegion
            );
        }
        if (smallerThanLT) {
            filteredData = filteredData.filter(
                (country) => country.area < 65300
            );
        }
        setFilteredData(filteredData);
        setCurrentPage(1);
    }, [data, selectedRegion, smallerThanLT]);

    // get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPost =
        selectedRegion !== 'All regions' || smallerThanLT
            ? filteredData.slice(indexOfFirstPost, indexOfLastPost)
            : data.slice(indexOfFirstPost, indexOfLastPost);

    // change page - function passed down as props to pagination.jsx, returns
    // value of click event as pageNumber and its used sets CurrentPage

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className='ButtonsContainer'>
                <div className='filterButtons'>
                    <button onClick={areaLessThanLT}>
                        Smaller than Lithuania
                    </button>
                    <div>
                        <label for='region'>Choose a region:</label>
                        <select onChange={filterByRegion} id='region'>
                            <option value='All regions'>All regions</option>
                            <option value='Africa'>Africa</option>
                            <option value='Americas'>Americas</option>
                            <option value='Antarctic Ocean'>
                                Antarctic Ocean
                            </option>
                            <option value='Asia'>Asia</option>
                            <option value='Europe'>Europe</option>
                            <option value='Oceania'>Oceania</option>
                            <option value='Polar'>Polar</option>
                        </select>
                    </div>
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
                totalPosts={
                    selectedRegion !== 'All regions' || smallerThanLT
                        ? filteredData.length
                        : data.length
                }
                paginate={paginate}
                currentPage={currentPage}
            />
        </>
    );
}

export default App;
