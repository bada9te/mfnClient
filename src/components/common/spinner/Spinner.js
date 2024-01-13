import { Box, CircularProgress, LinearProgress } from "@mui/material";


const SpinnerCircular = props => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress sx={{color: 'white'}} />
        </Box>
    );
}

const SpinnerLinear = props => {
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress sx={{color: 'white'}}/>
        </Box>
    );
}

export { SpinnerCircular, SpinnerLinear };

