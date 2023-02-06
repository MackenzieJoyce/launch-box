import { useEffect, useState } from "react";
import axios from "axios";
import { Container, AspectRatio, Image } from "@mantine/core";

import PageHeader from "../UI/PageHeader";
import InfoBar from "../UI/InfoBar";
// import SatelliteCounter from "../components/SatelliteCounter";
import YouTubeEmbedded from "../UI/YouTubeEmbedded";
// import Loading from "../UI/Loading";

export default function IssTracker() {
    const [issData, setIssData] = useState([]);
    const [firstAvailableViewing, setFirstAvailableViewing] = useState([]);
    const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 100));
    const [issSrc, setIssSrc] = useState("");
    const [issCaption, setIssCaption] = useState("");
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    let issRes = [];

    // Get ISS flyover data
    const getApiData = async () => {
        axios
            .get("https://tle.ivanstanojevic.me/api/tle/25544/flyover")
            .then((response) => {
                issRes = response.data.member;
                setFirstAvailableViewing(issRes[0]);
                setIssData(issRes.slice(1));
                // setLoading(false)
            })
            .catch((err) => {
                console.error(err);
                setError(true)
                // setLoading(false)
            })
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
            {/* {loading ? <Loading /> : null} */}
            {error ? <p>There was an error</p> : null}
            <InfoBar>
                <div style={styles.trackerComponent}>
                    {issData[0] ? (
                        <div style={styles.firstAvailableInfo}>
                            <h4>Your next available viewing date is </h4>
                            <h2 style={styles.highlight}>
                                {firstAvailableViewing.aos.date.slice(5, 7)}/
                                {firstAvailableViewing.aos.date.slice(8, 10)}/
                                {firstAvailableViewing.aos.date.slice(0, 4)}{" "}

                                at{" "}

                                {firstAvailableViewing.aos.date.slice(11, 16).split(':').map((time, i) => {
                                    if (i === 0) {
                                        time = time % 12 || 12;
                                    }
                                    if (i === 1) {
                                        time = time + (firstAvailableViewing.aos.date.slice(11, 16) < 12 ? ' AM' : ' PM');
                                    }
                                    return time;
                                }).join(':')}
                            </h2>
                            <AspectRatio ratio={16/9} md={{ minWidth: 300 }} mx="auto">
                                <Image src={issSrc} alt={issCaption} />
                            </AspectRatio>
                        </div>
                    ) :
                        <div style={styles.issLivestream}>
                            <p>No viewing times available... Let's take a look at what the ISS sees!</p>
                            <YouTubeEmbedded videoId="86YLFOog4GM" />
                        </div>
                    }

                    <div style={styles.otherAvailabilityContainer}>
                        {issData ? issData.map((iss) => (
                            <p key={iss.aos.date} style={styles.indivAvailability}>
                                {iss.aos.date.slice(5, 7)}/
                                {iss.aos.date.slice(8, 10)}/
                                {iss.aos.date.slice(0, 4)}{" "}

                                at{" "}

                                {iss.aos.date.slice(11, 16).split(':').map((time, i) => {
                                    if (i === 0) {
                                        time = time % 12 || 12;
                                    }
                                    if (i === 1) {
                                        time = time + (iss.aos.date.slice(11, 16) < 12 ? ' AM' : ' PM');
                                    }
                                    return time;
                                }).join(':')}
                            </p>
                        ))
                            : null }
                    </div>
                </div>
            </InfoBar>

            {/* <SatelliteCounter /> */}
        </Container>
    );
}

const styles = {
    trackerComponent: {
        padding: "3% 3% 5% 3%",
        // Added left and right padding to make video look better on smaller screens... Once viewing times are available, adjust content rather than setting this back to 0.
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
        // minWidth: "250px",
        // ^^^ Removed to make video take up whole component... Once viewing times are available, make this flexible.
        textAlign: "center",
    },
    indivAvailability: {
        padding: "5% 0",
        borderTop: ".5px solid #fff",
        borderBottom: ".5px solid lightgrey",
    },
    issLivestream: {
        width: "100%",
    },
}