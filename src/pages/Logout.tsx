import { useReactiveVar } from "@apollo/client";
import { Box, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { baseState } from "../components/baseReactive";
import { SpinnerCircular } from "../components/common/spinner/Spinner";
import { httpLogOut } from "../utils/http-requests/auth";
import { useTranslation } from "react-i18next";



export default function Logout() {
    const navigate = useNavigate();
    const { user: currentUser } = useReactiveVar(baseState);
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation("pages");

    
    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null;
        if (currentUser?._id !== "") {
            httpLogOut().then(() => {
                baseState({ ...baseState(), user: {} as any });
                
                timeout = setTimeout(() => {
                    enqueueSnackbar("Logged out", { autoHideDuration: 1500, variant: "success" });
                    navigate('/app/login')
                    window.location.reload();
                }, 1000);
            });
        } else {
            navigate('/app/');
        }
        return () => clearTimeout(timeout as NodeJS.Timeout);
    }, [currentUser?._id, navigate, enqueueSnackbar]);
    
    return (
        <Box sx={{ width: '100%', minHeight: '100vh', py: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Stack direction="column" spacing={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h4" sx={{my: 2}}>{t('logout.text')}</Typography>
                <SpinnerCircular/>
            </Stack>
        </Box>
    );
}
