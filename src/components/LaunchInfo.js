export default function LaunchInfo({ launch }) {
    let launchMonth = launch.date_str.substring(0, 4)
    let launchDay = launch.date_str.substring(4, 7)
    let launchYear = launch.date_str.substring(7, 11)

    return (
        <div style={styles.LaunchSection}>
            <div style={styles.LaunchDate}>
                <p style={styles.month}>{launchMonth}</p>
                <p>{launchDay}</p>
                <p>{launchYear}</p>
            </div>
            <div style={styles.LaunchInfo}>
                <h3>{launch.provider.name} | {launch.vehicle.name}</h3>
                <h4>{launch.name}</h4>
                <p>Location: {launch.pad.location.name}</p>
                {launch.win_open ?
                <p>Launch window: {launch.win_open}</p> :
                <p>Launch window not updated</p>}
            </div>
        </div>
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
        padding: '3% 6%',
        backgroundColor: 'rgb(255, 255, 255)',
        borderRight: '2px solid darkgray',
        borderBottom: '2px solid darkgray',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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