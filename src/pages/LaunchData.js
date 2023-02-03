import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, MediaQuery, Timeline } from '@mantine/core';

import PageHeader from '../UI/PageHeader';
import InfoBar from '../UI/InfoBar';
import Loading from '../UI/Loading';
import LaunchInfo from '../components/LaunchInfo';
import LaunchWeather from '../components/LaunchWeather';
import LiveStreams from '../helpers/LiveStreamLinks';

export default function LaunchData() {
    const [launchData, setLaunchData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    let launch

    const getLaunchData = () => {
        axios
            .get('https://fdo.rocketlaunch.live/json/launches/next/5')
            .then(response => {
                launch = response.data.result
                setLaunchData(launch)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setError(true)
                setLoading(false)
            })
    }

    useEffect(() => {
        getLaunchData();
    }, [])


    return (
        <MediaQuery smallerThan='md' styles={contain}>
            <Container size='md'>

                <PageHeader title='Launch Schedule' description='View the schedule for the next 5 launches' />

                <MediaQuery smallerThan='md' styles={reverseAbove}>
                <div style={styles.nextTo}>
                    {loading ? <Loading /> : null}
                    {error ? <p>There was an error</p> : null}

                    <Timeline color='red' radius='lg' active={0} bulletSize={24} lineWidth={6} style={styles.spacing}>
                        {launchData ? launchData.map((launch) => (
                            <Timeline.Item color='red' bulletSize={24} lineVariant='dashed'>
                                <InfoBar key={launch.id}>
                                    <div style={styles.launchBox}>
                                        <LaunchInfo launch={launch} />
                                        <LaunchWeather launch={launch} />
                                    </div>
                                </InfoBar>
                            </Timeline.Item>
                        )) : null}
                    </Timeline>

                    <MediaQuery smallerThan='md' styles={aside}>
                        <aside style={styles.spacing}>
                            <h3>Livestream Links</h3>
                            <MediaQuery smallerThan='md' styles={flat}>
                                <ul>
                                    { LiveStreams.map((livestream) => {
                                        return (
                                            <li key={livestream.name} style={styles.link}>
                                                <a href={livestream.url} target='_blank' rel='noreferrer'>{livestream.name}</a>
                                            </li>
                                        )
                                    })
                                    }
                                </ul>
                            </MediaQuery>
                        </aside>
                    </MediaQuery>
                </div>
                </MediaQuery>

            </Container>
        </MediaQuery>
    )
}

const styles = {
    nextTo: {
        display: 'flex',
    },
    spacing: {
        margin: '0 3%',
    },
    launchBox: {
        display: 'flex',
        padding: '3% 1%',
    },
    link: {
        width: 'fit-content',
        padding: '3% 0',
    },
}

const contain = {
    maxWidth: '93%',
    display: 'flex',
    flexDirection: 'column',
}

const reverseAbove = {
    flexDirection: 'column-reverse',
}

const aside = {
    marginBottom: '3%',
}

const flat = {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
}