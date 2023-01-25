import './App.scss';
import React, { useState, useEffect } from 'react';
import { Posts } from './components/Posts';

function App() {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState('idle');
    // for pagination
    const [currentpage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(50);

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

    return <Posts data={data} status={status} />;
}

export default App;
