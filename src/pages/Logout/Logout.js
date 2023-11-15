import { useReactiveVar } from "@apollo/client";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Alert from "../../components/alerts/alerts";
import { baseState } from "../../components/baseReactive";
import { SpinnerCircular } from "../../components/common/spinner/Spinner";
import { httpLogOut } from "../../requests/auth";


const Logout = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user: currentUser, theme } = useReactiveVar(baseState);
    
    useEffect(() => {
        let timeout = null;
        if (currentUser?._id !== "") {
            localStorage.removeItem("mfnCurrentUser");
            localStorage.removeItem("mfnCurrentToken");
            httpLogOut().then(() => {

                baseState({ ...baseState(), user: {} });
                
                timeout = setTimeout(() => {
                    Alert.alertSuccess("Logged out", { theme });
                    navigate('/login')
                }, 1000);
            });
        } else {
            navigate('/');
        }
        return () => clearTimeout(timeout);
    }, [currentUser?._id, dispatch, navigate, theme]);
    
    return (
        <>
            <Box sx={{ width: '100%', minHeight: '100vh', py: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Stack direction="column" spacing={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h4" sx={{my: 2}}>Logging out</Typography>
                    <SpinnerCircular/>
                </Stack>
            </Box>
        </>
    );
}

export default Logout;