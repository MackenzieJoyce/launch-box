import { MediaQuery } from "@mantine/core";

export default function LaunchInfo({ launch }) {
    const launchWin = launch.win_open;
    let launchTime = '';
    let localTime = '';


    if (launch.win_open) {
        // Get time after T and remove Z
        launchTime = launchWin.slice(11, 13);
        launchTime - 5 < 0 ? localTime = launchTime - 5 + 12 : localTime = launchTime - 5;
        launchTime = localTime + launchWin.slice(13, 16) + ' EST';
    }


    return (
        <MediaQuery smallerThan="sm" styles={stack}>
            <div style={styles.LaunchSection}>
                <MediaQuery smallerThan="sm" styles={stretch}>
                    <div style={styles.LaunchDate}>
                        <p style={styles.date}>{launch.date_str}</p>
                        {launch.win_open ?
                            <p>{launchTime}</p> :
                            <p>Launch window not updated</p>}
                    </div>
                </MediaQuery>
                <MediaQuery smallerThan="md" styles={stretch}>
                    <div style={styles.LaunchInfo}>
                        <h3>{launch.provider.name} | {launch.vehicle.name}</h3>
                        <h4>Vehicle Name: {launch.name}</h4>
                        <p>Pad: {launch.pad.name}</p>
                        <p>Location: {launch.pad.location.name}</p>
                        {launch.win_open ?
                        <p>Launch window: {launch.win_open}</p> :
                        <p>Launch window not updated</p>}
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