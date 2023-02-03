import { MediaQuery } from "@mantine/core";
import LiveStreams from '../helpers/LiveStreamLinks';
import LaunchTime from "../helpers/LaunchTime";

export default function LaunchInfo({ launch }) {
    return (
        <MediaQuery smallerThan="sm" styles={stack}>
            <div style={styles.LaunchSection}>
                <MediaQuery smallerThan="sm" styles={stretch}>
                    <div style={styles.LaunchDate}>
                        <p style={styles.date}>{launch.date_str}</p>
                        {launch.win_open ?
                            <LaunchTime launch={launch} />:
                            <p>Time of launch not updated</p>}
                    </div>
                </MediaQuery>
                <MediaQuery smallerThan="md" styles={stretch}>
                    <div style={styles.LaunchInfo}>
                        <h3>{launch.provider.name} | {launch.vehicle.name}</h3>
                        <h5>Vehicle Name: {launch.name}</h5>
                        <p>Pad: {launch.pad.name}</p>
                        <p>Location: {launch.pad.location.name}</p>
                        {LiveStreams.map((livestream) => {
                            if (launch.provider.name === livestream.name) {
                                return (
                                    <p><a href={livestream.url}>{livestream.summary}</a></p>
                                )
                            }
                        })}

                    </div>
                </MediaQuery>
            </div>
        </MediaQuery>
    )
}

const styles = {
    LaunchSection: {
        width: '70%',
        margin: '0 auto',
        display: 'flex',
    },
    LaunchDate: {
        minWidth: '40%',
        margin: '2%',
        padding: '5%',
        backgroundColor: 'rgb(255, 255, 255)',
        textAlign: 'center',
        borderRight: '2px solid darkgray',
        borderBottom: '2px solid darkgray',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    date: {
        fontSize: '1.5rem',
    },
    LaunchInfo: {
        width: '80%',
        textAlign: 'left',
        marginLeft: '3%',
    },
}

const stack = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

const stretch = {
    width: '100%',
    margin: '0',
}