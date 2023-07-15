import { Box, Stack, Typography } from "@mui/material";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Alert from "../../components/alerts/alerts";
import { logoutUser } from "../../components/baseSlice";
import Spinner from "../../components/common/spinner/Spinner";
import { httpLogOut } from "../../requests/auth";


const Logout = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.base.user);
    
    useEffect(() => {
        let timeout = null;
        if (currentUser?._id !== "") {
            localStorage.removeItem("mfnCurrentUser");
            httpLogOut().then(() => {
                dispatch(logoutUser());
                timeout = setTimeout(() => {
                    Alert.alertSuccess("Logged out");
                    navigate('/login')
                }, 1000);
            });
        } else {
            navigate('/');
        }
        return () => clearTimeout(timeout);
    }, [currentUser?._id, dispatch, navigate]);
    
    return (
        <>
            <Box sx={{ width: '100%', minHeight: '100vh', py: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Stack direction="column" spacing={4}>
                    <Typography variant="h4" sx={{my: 2}}>Logging out</Typography>
                    <Spinner/>
                </Stack>
            </Box>
        </>
    );
}

export default Logout;