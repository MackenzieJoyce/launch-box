import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@mantine/core";

import PageHeader from "../UI/PageHeader";
import InfoBar from "../UI/InfoBar";

export default function IssTracker() {
    const [issData, setIssData] = useState([]);
    const [firstAvailableViewing, setFirstAvailableViewing] = useState([]);
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

    return (
        <Container>
            <PageHeader title="ISS Tracker" description="Know when to look up!" />
            <section className="side-by-side">
                {loading ? <p>Loading...</p> : null}
                {error ? <p>There was an error</p> : null}
                {issData[0] ? (
                    <InfoBar>
                        <div style={styles.firstAvailableContainer}>
                            <p>Your next available viewing date is </p>
                            <h4>
                                {firstAvailableViewing.aos.date.substring(5, 7)}/
                                {firstAvailableViewing.aos.date.substring(8, 10)}/
                                {firstAvailableViewing.aos.date.substring(0, 4)}{" "}

                                at{" "}

                                {firstAvailableViewing.aos.date.substring(11, 16)}
                            </h4>
                        </div>
                    </InfoBar>
                ) : null}

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
            </section>
        </Container>
    );
}

const styles = {
    firstAvailableContainer: {
        height: "fit-content",
        padding: "8%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
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