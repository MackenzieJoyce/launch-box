import axios from "axios";
import { useEffect, useState } from "react";

export default function IssTracker() {
    const [issData, setIssData] = useState([]);
    const [currentLocation, setCurrentLocation] = useState();
    const [lat, setLat] = useState();
    const [long, setLong] = useState();

    // Get ISS flyover data
    const getApiData = async () => {
        axios
            .get("https://tle.ivanstanojevic.me/api/tle/25544/flyover")
            .then((response) => {
                // console.log(response.data.member);
                setIssData(response.data.member);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        getApiData();
    }, []);

    // Get form input value
    const cityHandler = (e) => {
        setCurrentLocation(e.target.value);
    };

    // Get lat and long from city name
    const handleCitySubmit = (e) => {
        e.preventDefault();
        axios
            .get(`http://api.openweathermap.org/geo/1.0/direct?q=${currentLocation}&limit=5&appid=607d41f5499e033c1a0dfe791c7b54e4`)
            .then((response) => {
                // console.log(response.data);
                setLat(response.data[0].lat);
                setLong(response.data[0].lon);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <>
            <h1>ISS Tracker</h1>
            <p>Know when to look up!</p>
            <form onSubmit={handleCitySubmit}>
                <label>Enter your city</label>
                <input type="text" onChange={cityHandler} />
                <span>(Pssst: capitalization matters!)</span>
                <button type="submit">Submit</button>
            </form>

            {issData ? issData.map((iss) => (
                    <div key={iss.id}>
                        <p>
                            {iss.aos.date}
                        </p>
                    </div>
                ))
             : (
                <p>Loading...</p>
            )}
        </>
    );
}