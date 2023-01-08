import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Timeline } from '@mantine/core';

import PageHeader from '../UI/PageHeader';
import InfoBar from '../UI/InfoBar';
import LaunchInfo from '../components/LaunchInfo';
import LaunchWeather from '../components/LaunchWeather';

export default function LaunchData() {
    const [launchData, setLaunchData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [activeBullet, setActiveBullet] = useState(0)

    const getApiData = () => {
        axios
            .get('https://fdo.rocketlaunch.live/json/launches/next/5')
            .then(response => {
                // console.log("Data: ", response.data.result);
                setLaunchData(response.data.result)
                setLoading(false)
                // If the first launch is today, set the active bullet to 1
                if (response.data.result[0].date_str === new Date().toISOString().slice(0, 10).replace(/-/g, "")) {
                    setActiveBullet(1)
                }
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

    console.log("Launch info: ", launchData)

    return (
        <Container>
            <PageHeader title="Launch Schedule" description="View the schedule for the next 5 launches" />
            {loading ? <p>Loading...</p> : null}
            {error ? <p>There was an error</p> : null}
            <Timeline color="red" radius="lg" active={activeBullet} bulletSize={24} lineWidth={6} style={styles.Timeline}>
                {launchData ? launchData.map((launch) => (
                    <Timeline.Item color="red" bulletSize={24} lineVariant="dashed">
                        <InfoBar key={launch.id}>
                            <div style={styles.launchBox}>
                                <LaunchInfo launch={launch} />
                                <LaunchWeather launch={launch} />
                            </div>
                        </InfoBar>
                    </Timeline.Item>
                )) : null}
            </Timeline>
        </Container>
    )
}

const styles = {
    Timeline: {
        maxWidth: '50%',
        margin: '0 auto 5% auto',
        padding: '0 1%',
    },
    launchBox: {
        display: 'flex',
        padding: '3% 1%',
    },
}