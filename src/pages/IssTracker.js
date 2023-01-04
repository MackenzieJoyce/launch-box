import { useEffect, useState } from "react";
import axios from "axios";

import InfoBar from "../UI/InfoBar";

export default function IssTracker() {
    const [issData, setIssData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    // const [currentLocation, setCurrentLocation] = useState();
    // const [lat, setLat] = useState();
    // const [long, setLong] = useState();

    // Get ISS flyover data
    const getApiData = async () => {
        axios
            .get("https://tle.ivanstanojevic.me/api/tle/25544/flyover")
            .then((response) => {
                console.log(response.data);
                setIssData(response.data.member);
                setLoading(false)
            })
            .catch((err) => {
                console.error(err);
                setError(true)
                setLoading(false)
            });
    };

    useEffect(() => {
        getApiData();
    }, []);

    // // Get form input value
    // const cityHandler = (e) => {
    //     setCurrentLocation(e.target.value);
    // };

    // // Get lat and long from city name
    // const handleCitySubmit = (e) => {
    //     e.preventDefault();
    //     axios
    //         .get(`http://api.openweathermap.org/geo/1.0/direct?q=${currentLocation}&limit=5&appid=607d41f5499e033c1a0dfe791c7b54e4`)
    //         .then((response) => {
    //             // console.log(response.data);
    //             setLat(response.data[0].lat);
    //             setLong(response.data[0].lon);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // };

    return (
        <>
            <h1>ISS Tracker</h1>
            <p>Know when to look up!</p>
            {/* <form onSubmit={handleCitySubmit}>
                <label>Enter your city</label>
                <input type="text" onChange={cityHandler} />
                <span>(Pssst: capitalization matters!)</span>
                <button type="submit">Submit</button>
            </form> */}

            {loading ? <p>Loading...</p> : null}
            {error ? <p>There was an error</p> : null}
            {issData ? issData.map((iss) => (
                    <InfoBar key={iss.id}>
                        <p>
                            {iss.aos.date.substring(5, 7)}/
                            {iss.aos.date.substring(8, 10)}/
                            {iss.aos.date.substring(0, 4)}{" "}

                            at{" "}

                            {iss.aos.date.substring(11, 19)}
                        </p>
                    </InfoBar>
                ))
                : null}
        </>
    );
}