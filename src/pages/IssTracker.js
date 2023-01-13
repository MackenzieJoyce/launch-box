import { useEffect, useState } from "react";
import axios from "axios";
import { Container, AspectRatio, Image } from "@mantine/core";

import PageHeader from "../UI/PageHeader";
import InfoBar from "../UI/InfoBar";
import SatelliteCounter from "../components/SatelliteCounter";
import Loading from "../UI/Loading";

export default function IssTracker() {
    const [issData, setIssData] = useState([]);
    const [firstAvailableViewing, setFirstAvailableViewing] = useState([]);
    const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 100));
    const [issSrc, setIssSrc] = useState("");
    const [issCaption, setIssCaption] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Get ISS flyover data
    const getApiData = async () => {
        axios
            .get("https://tle.ivanstanojevic.me/api/tle/25544/flyover")
            .then((response) => {
                setFirstAvailableViewing(response.data.member[0]);
                setIssData(response.data.member.slice(1));
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

    if (issData !== []) {
        axios
            .get("https://images-api.nasa.gov/search?q=nasa+iss+images")
            .then((response) => {
                const imgPath = response.data.collection.items[randomNum];
                setIssSrc(imgPath.links[0].href);
                setIssCaption(imgPath.data[0].title);
            }
        )
    }

    return (
        <Container size="md">
            <PageHeader title="ISS Tracker" description="Know when to look up!" />
            {loading ? <Loading /> : null}
            {error ? <p>There was an error</p> : null}
            <InfoBar>
                <div style={styles.trackerComponent}>
                    {issData[0] ? (
                        <div style={styles.firstAvailableInfo}>
                            <h4>Your next available viewing date is </h4>
                            <h2 style={styles.highlight}>
                                {firstAvailableViewing.aos.date.substring(5, 7)}/
                                {firstAvailableViewing.aos.date.substring(8, 10)}/
                                {firstAvailableViewing.aos.date.substring(0, 4)}{" "}

                                at{" "}

                                {firstAvailableViewing.aos.date.substring(11, 16)}
                            </h2>
                            <AspectRatio ratio={16/9} md={{ minWidth: 300 }} mx="auto">
                                <Image src={issSrc} alt={issCaption} />
                            </AspectRatio>
                        </div>
                    ) : null}

                    <div style={styles.otherAvailabilityContainer}>
                        {issData ? issData.map((iss) => (
                            <div key={iss.id} style={styles.indivAvailability}>
                                <p>
                                    {iss.aos.date.substring(5, 7)}/
                                    {iss.aos.date.substring(8, 10)}/
                                    {iss.aos.date.substring(0, 4)}{" "}

                                    at{" "}

                                    {iss.aos.date.substring(11, 16)}
                                </p>
                            </div>
                        ))
                        : null}
                    </div>
                </div>
            </InfoBar>

            <Container>
                <SatelliteCounter />
            </Container>
        </Container>
    );
}

const styles = {
    trackerComponent: {
        padding: "3% 0 5% 0",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    firstAvailableInfo: {
        textAlign: "center",
    },
    highlight: {
        padding: "0 0 3% 0",
        borderBottom: "2px solid red",
    },
    otherAvailabilityContainer: {
        minWidth: "250px",
        textAlign: "center",
    },
    indivAvailability: {
        padding: "5% 0",
        borderTop: ".5px solid #fff",
        borderBottom: ".5px solid lightgrey",
    }
}