import { MediaQuery } from "@mantine/core";

export default function LaunchInfo({ launch }) {
    let launchMonth = launch.date_str.substring(0, 4)
    let launchDay = launch.date_str.substring(4, 7)

    return (
        <MediaQuery smallerThan="sm" styles={stack}>
            <div style={styles.LaunchSection}>
                <MediaQuery smallerThan="sm" styles={stretch}>
                    <div style={styles.LaunchDate}>
                        <p style={styles.month}>{launchMonth} {launchDay}</p>
                    </div>
                </MediaQuery>
                <MediaQuery smallerThan="md" styles={stretch}>
                    <div style={styles.LaunchInfo}>
                        <h3>{launch.provider.name} | {launch.vehicle.name}</h3>
                        <h4>{launch.name}</h4>
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
    month: {
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