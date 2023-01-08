import loading from "../assets/images/loading.gif"
import { Container } from "@mantine/core"

export default function Loading() {
    return (
        <Container>
            <img src={loading} alt="Loading..." />
        </Container>
    )
}