import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Launch Schedule</Link>
                </li>
                <li>
                    <Link to="/iss-tracker">ISS Tracker</Link>
                </li>
            </ul>
        </nav>
    );
}