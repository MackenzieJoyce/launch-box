export default function LaunchInfo({ launch }) {
    return (
        <>
            <span>{launch.date_str}</span>
            <h3>{launch.provider.name} | {launch.vehicle.name}</h3>
            <h4>{launch.name}</h4>
            <p>Location: {launch.pad.location.name}</p>
            {launch.win_open ?
                <p>Launch window: {launch.win_open}</p> :
                <p>Launch window not updated</p>}
        </>
    )
}