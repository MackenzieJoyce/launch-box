import { Link } from "react-router-dom";
import { useState } from "react";
import { MediaQuery, Tabs } from '@mantine/core';
import logo from '../assets/images/logo.png';

export default function NavBar() {
    const [activeTab, setActiveTab] = useState(window.location.pathname);

    const handleChange = (value) => {
        setActiveTab(value);
    };

    return (
        <MediaQuery smallerThan="xs" styles={stack}>
        <header style={styles.flex}>
            <div style={styles.logoDiv}>
                <img src={logo} alt="logo" style={styles.logoImg}/>
                <h1>Launch Box</h1>
                </div>


            <nav style={styles.flexDown}>
                <div style={styles.full}>
                    <Tabs value={activeTab} onTabChange={handleChange} color="red">
                        <MediaQuery smallerThan="xs" styles={center}>
                        <Tabs.List position="right">
                            <Tabs.Tab value="/" component={Link} to="/">
                                Launch Schedule
                            </Tabs.Tab>
                            <Tabs.Tab value="/iss-tracker" component={Link} to="/iss-tracker">
                                ISS Tracker
                            </Tabs.Tab>
                        </Tabs.List>
                        </MediaQuery>
                    </Tabs>
                </div>
            </nav>
        </header>
        </MediaQuery>
    );
}

const styles = {
    flex: {
        display: "flex",
        justifyContent: "space-between",
    },
    full: {
        width: "100%",
    },
    flexDown: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    logoDiv: {
        minWidth: "fit-content",
        padding: "0 3% 0 2%",
        borderBottom: "2px solid red",
        display: "flex",
    },
    logoImg: {
        width: "70px",
        height: "auto",
        objectFit: "cover",
    },
};

// MediaQueries
const stack = {
    flexDirection: "column",
    alignItems: "center",
};

const center = {
    justifyContent: "center",
};