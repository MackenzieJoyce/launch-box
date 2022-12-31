export default function LaunchInfo({ launchData }) {
    return (
        <>
            {launchData.map((launch) => (
                <div key={launchData.result}>
                    <span>{launch.date_str}</span>
                    <h3>{launch.provider.name} | {launch.vehicle.name}</h3>
                    <h4>{launch.name}</h4>
                    <p>{launch.pad.location.name}</p>
                    {launch.win_open ?
                        <p>{launch.win_open}</p> :
                    <p>{launch.win_open}</p>}
                    <p>"Launch window not updated"</p>
                </div>
            ))}
        </>
    )
}