export default function YouTubeEmbedded({ videoId }) {
    return (
        <div style={styles.videoContainer}>
            <iframe
                style={styles.video}
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}

const styles = {
    videoContainer: {
        position: "relative",
        width: "100%",
        height: 0,
        paddingBottom: "56.25%",
    },
    video: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    },
};