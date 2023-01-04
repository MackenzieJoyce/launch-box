import React, { useState, useEffect } from 'react';
import axios from 'axios';

import InfoBar from '../UI/InfoBar';
import LaunchInfo from '../components/LaunchInfo';
import LaunchWeather from '../components/LaunchWeather';

export default function LaunchData() {
    const [launchData, setLaunchData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const getApiData = () => {
        return (
            axios
                .get('https://fdo.rocketlaunch.live/json/launches/next/5')
                .then(response => {
                    console.log(response.data.result);
                    setLaunchData(response.data.result)
                    setLoading(false)
                })
                .catch(error => {
                    console.log(error)
                    setError(true)
                    setLoading(false)
                })
        )
    }

    useEffect(() => {
        getApiData()
    }, [])

    return (
        <>
            <h1>Launch Schedule</h1>
            <p>View the schedule for the next 5 launches.</p>
            {loading ? <p>Loading...</p> : null}
            {error ? <p>There was an error</p> : null}
            {launchData ? launchData.map((launch) => (
                <InfoBar key={launch.result}>
                    <LaunchInfo launch={launch} />
                    <LaunchWeather launch={launch} />
                </InfoBar>
            )) : null}
        </>
    )
}