import { Link } from "react-router-dom";
import { useState } from "react";
import { Tabs } from '@mantine/core';
import logo from '../assets/images/logo.png';

export default function NavBar() {
    const [activeTab, setActiveTab] = useState(window.location.pathname);

    const handleChange = (value) => {
        setActiveTab(value);
    };

    return (
        <header style={styles.flex}>
            <div style={styles.logoDiv}>
                <img src={logo} alt="logo" style={styles.logoImg}/>
                <h1>Launch Box</h1>
            </div>
            <nav style={styles.flexDown}>
                <div style={styles.full}>
                    <Tabs value={activeTab} onTabChange={handleChange} color="red">
                        <Tabs.List position="right">
                            <Tabs.Tab value="/" component={Link} to="/">
                                Launch Schedule
                            </Tabs.Tab>
                            <Tabs.Tab value="/iss-tracker" component={Link} to="/iss-tracker">
                                ISS Tracker
                            </Tabs.Tab>
                        </Tabs.List>
                    </Tabs>
                </div>
            </nav>
        </header>
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
