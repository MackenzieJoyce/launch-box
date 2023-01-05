import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Timeline } from '@mantine/core';

import PageHeader from '../UI/PageHeader';
import InfoBar from '../UI/InfoBar';
import LaunchInfo from '../components/LaunchInfo';
import LaunchWeather from '../components/LaunchWeather';

export default function LaunchData() {
    const [launchData, setLaunchData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const getApiData = () => {
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
    }

    useEffect(() => {
        getApiData()
    }, [])


    const handleActiveBullet = () => {
        // Default the number of active bullets to be only the first bullet
        let activeBullet = 0
        // Filter the launchData array to find any launches that have the same date as the first launch
        const sameDate = launchData.filter(launch => launch.date_str === launchData[0].date_str)
        // If there are any launches with the same date as the first launch, set the number of active bullets to be the number of launches with the same date as the first launch minus 2 (to account for the first launch and the last launch)
        if (sameDate.length > 0) {
            activeBullet = sameDate.length + 1 - 2
        } else {
            activeBullet = 0
        }
        return activeBullet
    }

    return (
        <>
            <PageHeader title="Launch Schedule" description="View the schedule for the next 5 launches" />
            {loading ? <p>Loading...</p> : null}
            {error ? <p>There was an error</p> : null}
            <Timeline color="red" radius="lg" active={handleActiveBullet()} bulletSize={24} lineWidth={6} style={styles.Timeline}>
                {launchData ? launchData.map((launch) => (
                    <Timeline.Item color="red" bulletSize={24}>
                        <InfoBar key={launch.id}>
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