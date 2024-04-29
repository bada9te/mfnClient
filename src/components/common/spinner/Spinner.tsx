import { Box, CircularProgress, LinearProgress } from "@mui/material";


export function SpinnerCircular() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    );
}

export function SpinnerLinear() {
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress/>
        </Box>
    );
}
