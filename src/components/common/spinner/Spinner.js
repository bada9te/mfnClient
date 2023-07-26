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
            <LinearProgress />
        </Box>
    );
}

export { SpinnerCircular, SpinnerLinear };


/*
        <div className="w-100 d-flex justify-content-center spinner" style={{ margin: '0 auto' }}>
            <Sp animation="border"/>
        </div>
        */