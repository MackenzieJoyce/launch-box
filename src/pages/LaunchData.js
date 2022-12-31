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
        backgroundColor: 'rgb(252, 252,252)',
        border: '1px solid black',
        borderRadius: '5px',
        display: 'flex',
    },
}