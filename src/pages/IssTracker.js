import { useEffect, useState } from "react";
import axios from "axios";

import InfoBar from "../UI/InfoBar";

export default function IssTracker() {
    const [issData, setIssData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    // Get ISS flyover data
    const getApiData = async () => {
        axios
            .get("https://tle.ivanstanojevic.me/api/tle/25544/flyover")
            .then((response) => {
                // console.log(response.data);
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

    return (
        <>
            <h1>ISS Tracker</h1>
            <p>Know when to look up!</p>
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