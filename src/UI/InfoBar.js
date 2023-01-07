export default function InfoBar(props) {
    return (
        <div style={styles.InfoBar}>
            {props.children}
        </div>
    )
}

const styles = {
    InfoBar: {
        // width: '50%',
        // margin: '2% auto',
        // padding: '2%',
        height: 'fit-content',
        backgroundColor: 'rgb(233, 233, 233)',
        border: '1px solid darkgray',
        borderRadius: '12px',
        boxShadow: '0 1px 8px rgba(0, 0, 0, 0.25)',
        // display: 'flex',
    },
}