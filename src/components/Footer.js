import { Container } from '@mantine/core';

export default function Footer() {
    return (
        <footer style={styles.footer}>
            <Container size="sm">
                <h6>Created by <a href="https://www.mackenziejoyce.com">Mackenzie Joyce</a></h6>

                <h6>About</h6>
                <p style={styles.text}>
                    This app was created for my uncle, Juan. His love for space exploration has been a constant in my life, and sparked my interest in space at a young age. We talk often about the latest space news, but I'm not always up to date on upcoming launches. Although this app was built for him, my hope is that many people can find joy from the information provided.
                </p>
                <p style={styles.spacing}>
                    I will continue to update and add more features. <a href="mailto:mackenziejoyce414@gmail.com">Let me know</a> what works, doesn't work, or what you would want to see next!
                </p>
            </Container>
            <Container size="sm">
                <div>
                    <h6>Checkout the APIs</h6>
                    <ul style={styles.text}>
                        <li>
                            <a href="https://www.rocketlaunch.live/api">RocketLaunch.Live</a>
                        </li>
                        <li>
                            <a href="https://tle.ivanstanojevic.me/#/tle/25544">TLE API</a>
                        </li>
                        <li>
                            <a href="https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf">NASA Images and Video Library</a>
                        </li>
                    </ul>
                </div>
                <div style={styles.spacing}>
                    <a href="https://github.com/MackenzieJoyce/launch-box"><h6>View the Code</h6></a>
                </div>
            </Container>
        </footer>
    );
}

const styles = {
    footer: {
        marginTop: '5%',
        padding: '.5%',
        backgroundColor: 'rgb(233, 233, 233)',
        borderTop: '2px solid lightgray',
        display: 'flex',
        justifyContent: 'space-evenly',
    },
    text: {
        fontSize: '.8rem',
        lineHeight: '1.3rem',
    },
    spacing: {
        fontSize: '.8rem',
        lineHeight: '1.3rem',
        marginTop: '1%',
    },
}