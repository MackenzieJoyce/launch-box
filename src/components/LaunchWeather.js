export default function LaunchWeather({ launch }) {
    return(
        <div style={styles.WeatherSection} className="weather-info">
            <h5>Weather Forecast</h5>
            {launch.weather_summary ?
                <div>
                    <p>Conditions: {launch.weather_condition}</p>
                    <p>Temp: {launch.weather_temp}</p>
                    <p>Wind: {launch.weather_wind_mph} mph</p>
                </div>
            :
            <p>Weather not updated</p>}
        </div>
    )
}

const styles = {
    WeatherSection: {
        width: '30%',
        margin: '0 auto',
        padding: '1%',
        display: 'flex',
        flexDirection: 'column',
    },
}