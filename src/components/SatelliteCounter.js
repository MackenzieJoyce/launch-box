import { useState } from "react";
import axios from "axios";

export default function SatelliteCounter() {
    const [satelliteCount, setSatelliteCount] = useState();
    const [spaceStationCount, setSpaceStationCount] = useState();

    // Active satellites
    const activeSatellites = async () => {
        axios
            .get("https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=json")
            .then((response) => {
                setSatelliteCount(response.data.length);
            })
            .catch((err) => {
                console.error(err);
            });
    };
    activeSatellites();

    // Active space stations
    const spaceStations = async () => {
        axios
            .get("https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=json")
            .then((response) => {
                setSpaceStationCount(response.data.length);
            })
            .catch((err) => {
                console.error(err);
            });
    };
    spaceStations();

    return (
        <div>
            <h3>There are currently {satelliteCount} active satellites and {spaceStationCount} space stations! </h3>
       </div>
    )
}