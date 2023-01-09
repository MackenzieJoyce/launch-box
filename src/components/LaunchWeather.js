import { MediaQuery } from "@mantine/core";

export default function LaunchWeather({ launch }) {
    return (
        <MediaQuery smallerThan="sm" styles={fill}>
            <div style={styles.WeatherSection}>
                <h5>Weather Forecast</h5>
                {launch.weather_summary ?
                    <div>
                        <p>Conditions: {launch.weather_condition}</p>
                        <p>Temp: {launch.weather_temp}&deg;F</p>
                        <p>Wind: {launch.weather_wind_mph} mph</p>
                    </div>
                :
                <p>Weather not updated</p>}
            </div>
        </MediaQuery>
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

const fill = {
    minWidth: '56%',
    margin: '0',
}