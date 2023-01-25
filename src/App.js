import './App.scss';
import React, { useState, useEffect } from 'react';

function App() {
    const [data, setData] = useState('');
    const [status, setStatus] = useState('idle');
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

    return <>hi</>;
}

export default App;
