import { Link } from "react-router-dom";
import { Tabs } from '@mantine/core';

export default function NavBar() {
    return (
        <nav>
            <Tabs defaultValue="LaunchData">
                <Tabs.List position="right">
                    <Link to="/">
                        <Tabs.Tab value="LaunchData">
                            Launch Schedule
                        </Tabs.Tab>
                    </Link>
                    <Link to="/iss-tracker">
                        <Tabs.Tab value="IssTracker">
                            ISS Tracker
                        </Tabs.Tab>
                    </Link>
                </Tabs.List>
            </Tabs>
        </nav>
    );
}