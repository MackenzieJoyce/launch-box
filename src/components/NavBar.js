import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav style={styles.nav}>
            <Link to="/" style={styles.link}>Launch Schedule</Link>
            <Link to="/iss-tracker" style={styles.link}>ISS Tracker</Link>
        </nav>
    );
}

const styles = {
    nav: {
        padding: "2%",
    },
    link: {
        margin: "0 2%",
        padding: "3% 2% 2% 2%",
        backgroundColor: "rgb(244, 244, 244)",
        border: "1px solid black",
        borderRadius: "5px",
    }
}