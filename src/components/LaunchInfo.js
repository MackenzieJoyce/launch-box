import { MediaQuery } from "@mantine/core";

export default function LaunchInfo({ launch }) {
    let launchMonth = launch.date_str.substring(0, 3)
    let launchDay = launch.date_str.substring(4, 6)
    let launchDate = `${launchMonth} ${launchDay}`

    return (
        <MediaQuery smallerThan="sm" styles={stack}>
            <div style={styles.LaunchSection}>
                <MediaQuery smallerThan="sm" styles={stretch}>
                    <div style={styles.LaunchDate}>
                        <p style={styles.date}>{launchDate}</p>
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
        margin: '2%',
        padding: '6%',
        backgroundColor: 'rgb(255, 255, 255)',
        textAlign: 'center',
        borderRight: '2px solid darkgray',
        borderBottom: '2px solid darkgray',
        borderRadius: '10px',
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