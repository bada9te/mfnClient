import { Add, Delete, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionActions, AccordionSummary, Button, Typography } from "@mui/material";

const Playlist = (props) => {
    const { playlist } = props;
    //console.log(playlist)

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{playlist.title}</Typography>
            </AccordionSummary>
            <AccordionActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button startIcon={<Delete/>} color="error">Delete playlist</Button>
                <Button startIcon={<Add/>}>Add track</Button>
            </AccordionActions>
        </Accordion>
    );
}


export default Playlist;