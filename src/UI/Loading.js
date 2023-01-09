import loading from "../assets/images/loading.gif"
import { AspectRatio, Image } from "@mantine/core"

export default function Loading() {
    return (
        <AspectRatio ratio={16/9}>
            <Image src={loading} alt="Loading..." />
        </AspectRatio>
    )
}