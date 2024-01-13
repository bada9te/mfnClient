import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from "@mui/material";
import BaseContentContainer from "../../components/containers/base-content-container/base-content-container";



const FAQ = (props) => {
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla gravida, lectus fermentum ullamcorper sollicitudin, lacus velit ultrices tellus, non facilisis sem enim non sem. Maecenas condimentum aliquet maximus. Morbi lorem metus, tempor vitae posuere ac, sagittis a mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat ipsum lacinia lectus commodo, convallis mattis lectus condimentum. Nullam at ex lacus. Ut a elit in velit vulputate faucibus."

    return (
        <BaseContentContainer>
            <Stack useFlexGap spacing={2} sx={{m: 2, borderRadius: 5}}>
                <Accordion sx={{boxShadow: 10, borderRadius: 5}}>
                    <AccordionSummary expandIcon={<ExpandMore/>}>
                        <Typography>Who we are?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {text}
                    </AccordionDetails>    
                </Accordion> 

                <Accordion sx={{boxShadow: 10, borderRadius: 5}}>
                    <AccordionSummary expandIcon={<ExpandMore/>}>
                        <Typography>How can I restore my account?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {text}
                    </AccordionDetails>    
                </Accordion>
                
                <Accordion sx={{boxShadow: 10, borderRadius: 5}}>
                    <AccordionSummary expandIcon={<ExpandMore/>}>
                        <Typography>How can I post sth?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {text}
                    </AccordionDetails>    
                </Accordion>
                    
                <Accordion sx={{boxShadow: 10, borderRadius: 5}}>
                    <AccordionSummary expandIcon={<ExpandMore/>}>
                        <Typography>What type of data can I load?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {text}
                    </AccordionDetails>    
                </Accordion>
                    
                <Accordion sx={{boxShadow: 10, borderRadius: 5}}>
                    <AccordionSummary expandIcon={<ExpandMore/>}>
                        <Typography>How can I report something or somebody?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {text}
                    </AccordionDetails>    
                </Accordion>

                <Accordion sx={{boxShadow: 10, borderRadius: 5}}>
                    <AccordionSummary expandIcon={<ExpandMore/>}>
                        <Typography>How do battles work?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {text}
                    </AccordionDetails>    
                </Accordion>    
            </Stack>
        </BaseContentContainer>
    );
}


export default FAQ;