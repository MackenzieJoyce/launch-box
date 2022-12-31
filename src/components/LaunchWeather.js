export default function LaunchWeather({ launch }) {
    return(
        <>
            <div>
                <h5>Weather</h5>
                <p>Conditions: {launch.weather_condition}</p>
                <p>Temp: {launch.weather_temp}</p>
                <p>Wind: {launch.weather_wind_mph} mph</p>
            </div>
        </>
    )
}