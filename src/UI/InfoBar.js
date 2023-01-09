import { MediaQuery } from "@mantine/core";

export default function InfoBar(props) {
    return (
        <div style={styles.InfoBar}>
            <MediaQuery smallerThan="sm" styles={stack}>
                {props.children}
            </MediaQuery>
        </div>
    )
}

const styles = {
    InfoBar: {
        backgroundColor: 'rgb(233, 233, 233)',
        border: '1px solid darkgray',
        borderRadius: '12px',
        boxShadow: '0 1px 8px rgba(0, 0, 0, 0.25)',
    },
}

const stack = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}