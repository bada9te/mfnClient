import { Box, CircularProgress, LinearProgress } from "@mui/material";


const SpinnerCircular = props => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    );
}

const SpinnerLinear = props => {
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress/>
        </Box>
    );
}

export { SpinnerCircular, SpinnerLinear };

