export default function PageHeader(props) {
    return (
        <div style={styles.PageHeader}>
            <h1>{props.title}</h1>
            <p>{props.description}</p>
        </div>
    )
}

const styles = {
    PageHeader: {
        width: '70%',
        margin: '0 auto',
        textAlign: 'center',
        padding: '2% 0',
    },
}