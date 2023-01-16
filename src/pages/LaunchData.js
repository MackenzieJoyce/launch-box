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
    const [activeBullet, setActiveBullet] = useState(0)
    let launch
    // let sameDate = []
    // let manyLaunch
    // let singleLaunch


    useEffect(() => {
        axios
            .get('https://fdo.rocketlaunch.live/json/launches/next/5')
            .then(response => {
                console.log('Data: ', response.data.result);
                launch = response.data.result
                setLaunchData(launch)
                setLoading(false)
                // If the first launch is today, set the active bullet to 1
                if (launch[0].date_str === new Date().toISOString().slice(0, 10).replace(/-/g, '')) {
                    setActiveBullet(1)
                }

                // while (launch.length > 0) {
                //     let firstLaunch = launch[0]
                //     let firstLaunchDate = firstLaunch.date_str

                //     let launchesWithSameDate = launch.filter(launch => launch.date_str === firstLaunchDate)

                //     if (launchesWithSameDate.length > 0) {
                //         sameDate.push(launchesWithSameDate)
                //         launch = launch.slice(launchesWithSameDate.length)
                //     }
                //     else {
                //         launch = launch.slice(1)
                //     }
                // }

                // console.log('Same Date: ', sameDate);

                // Find index that have an array
                // let index = sameDate.findIndex((element) => {
                //     return element.length > 1
                // })

                // Show the date of a repeated launch
                // let whatDay = sameDate[index][0].date_str
                // console.log('What day: ', whatDay);

                // // make a new array that will hold the needed info for the specific index of sameDate
                // manyLaunch = sameDate[index].map((launch) => {
                //     return {
                //         name: launch.name,
                //         provider: launch.provider.name,
                //         vehicle: launch.vehicle.name,
                //         pad: launch.pad.location.name,
                //         date: launch.date_str,
                //         win_open: launch.win_open,
                //     }
                // })

                // // Push back into sameDate
                // sameDate[index] = manyLaunch

                // Create array inside of each index to give one a date and the other the api information 
                // sameDate[index] = [{ date: whatDay }, manyLaunch]


                // Create new array that will hold objects
                // Date is key
                // Launch info is value
                // let newArray = []
                // sameDate.forEach((launch) => {
                //     let date = launch[0].date_str
                //     let launchInfo = launch.map((launch) => {
                //         return {
                //             name: launch.name,
                //             provider: launch.provider.name,
                //             vehicle: launch.vehicle.name,
                //             pad: launch.pad.location.name,
                //             date: launch.date_str,
                //             win_open: launch.win_open,
                //         }
                //     })
                //     newArray.push({ [date]: launchInfo })
                // })
                // console.log('New Array: ', newArray);

                // setLaunchData(sameDate)
            })
            .catch(error => {
                console.log(error)
                setError(true)
                setLoading(false)
            })
        console.log('Launch Data: ', launchData);
    }, [])

    return (
        <MediaQuery smallerThan='md' styles={contain}>
            <Container size='md'>
                <PageHeader title='Launch Schedule' description='View the schedule for the next 5 launches' />
                <MediaQuery smallerThan='md' styles={reverseAbove}>
                <div style={styles.nextTo}>
                    {loading ? <Loading /> : null}
                    {error ? <p>There was an error</p> : null}

                    <Timeline color='red' radius='lg' active={activeBullet} bulletSize={24} lineWidth={6} style={styles.spacing}>
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
    }
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