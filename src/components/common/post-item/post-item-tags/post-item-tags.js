import { Face } from "@mui/icons-material";
import { Chip, Stack } from "@mui/material";

const PostItemTags = props => {
    return (
        <Stack useFlexGap spacing={1} direction="row">
            <Chip icon={<Face/>} label="rock"/>
        </Stack>
    );
}

export default PostItemTags;