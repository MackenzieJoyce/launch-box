import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Timeline } from '@mantine/core';

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
                    // console.log(response.data.result);
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
            <Timeline color="red" radius="lg" active={0} bulletSize={24} style={styles.Timeline}>
                {launchData ? launchData.map((launch) => (
                    <Timeline.Item key={launch.result} color="red" bulletSize={24}>
                        <InfoBar>
                            <LaunchInfo launch={launch} />
                            <LaunchWeather launch={launch} />
                        </InfoBar>
                    </Timeline.Item>
                )) : null}
            </Timeline>

        </>
    )
}

const styles = {
    Timeline: {
        maxWidth: '50%',
        margin: '0 auto',
        padding: '0 1%',
    }
}