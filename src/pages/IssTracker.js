import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@mantine/core";

import PageHeader from "../UI/PageHeader";
import InfoBar from "../UI/InfoBar";

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
        <Container>
            <PageHeader title="ISS Tracker" description="Know when to look up!" />
            <section className="side-by-side">
                {loading ? <p>Loading...</p> : null}
                {error ? <p>There was an error</p> : null}
                {issData[0] ? (
                    <Container style={styles.firstAvailableInfo}>
                        <InfoBar>
                            <p>Your next available viewing date is </p>
                            <h4>
                                {firstAvailableViewing.aos.date.substring(5, 7)}/
                                {firstAvailableViewing.aos.date.substring(8, 10)}/
                                {firstAvailableViewing.aos.date.substring(0, 4)}{" "}

                                at{" "}

                                {firstAvailableViewing.aos.date.substring(11, 16)}
                            </h4>
                            <img src={issSrc} alt={issSrc} style={styles.firstAvailableImg}></img>
                        </InfoBar>
                    </Container>
                ) : null}

                <Container height={200}>
                <InfoBar>
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
                    </InfoBar>
                </Container>
            </section>
        </Container>
    );
}

const styles = {
    firstAvailableInfo: {
        textAlign: "center",
    },
    firstAvailableImg: {
        width: "80%",
        height: "auto",
        margin: "3%",
        objectFit: "contain",
    },
    otherAvailabilityContainer: {
        padding: "8%",
        minWidth: "250px",
        textAlign: "center",
    },
    indivAvailability: {
        margin: "0 0 8% 0",
    }
}