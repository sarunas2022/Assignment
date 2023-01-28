import './App.scss';
import React, { useState, useEffect } from 'react';
import { Posts } from './components/Posts';
import { Pagination } from './components/Pagination';
import { FilterAndSort } from './components/FilterAndSort';

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

                const sortedResponse = response.sort((a, b) => {
                    if (a.name < b.name) return -1;
                    return 1;
                });
                setData(sortedResponse);

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
        const chosenRegion = event.target.value;
        setSelectedRegion(chosenRegion);
    };
    // onClicks  filtering posts by area < Lithuania
    const areaLessThanLT = () => {
        setSmallerThanLT(!smallerThanLT);
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

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        // to scroll to the top of the page if pressed not on a href but on div
        window.scrollTo(0, 0);
    };

    return (
        <div className='output'>
            <FilterAndSort
                areaLessThanLT={() => areaLessThanLT()}
                filterByRegion={(event) => filterByRegion(event)}
                sortingPosts={() => sortingPosts()}
                sort={sort}
            />
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
        </div>
    );
}

export default App;
