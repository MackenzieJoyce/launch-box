import { Link } from "react-router-dom";
import { useState } from "react";
import { Tabs } from '@mantine/core';

export default function NavBar() {
    const [activeTab, setActiveTab] = useState(window.location.pathname);

    const handleChange = (value) => {
        setActiveTab(value);
    };

    return (
        <nav>
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
        </nav>
    );
}