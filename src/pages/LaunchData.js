import React, { useState, useEffect } from 'react'
import axios from 'axios'

import LaunchInfo from '../components/LaunchInfo'
import LaunchWeather from '../components/LaunchWeather'

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
                <div key={launch.result} style={styles.LaunchData}>
                    <LaunchInfo launch={launch} />
                    <LaunchWeather launch={launch} />
                </div>
            )) : null}
        </>
    )
}

const styles = {
    LaunchData: {
        width: '80%',
        margin: '2% auto',
        backgroundColor: 'rgb(233, 233, 233)',
        border: '1px solid darkgray',
        borderRadius: '12px',
        boxShadow: '0 1px 8px rgba(0, 0, 0, 0.25)',
        display: 'flex',
    },
}