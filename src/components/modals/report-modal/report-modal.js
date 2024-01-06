import { useReactiveVar } from "@apollo/client";
import { Close } from "@mui/icons-material";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import ReportForm from "../../forms/report/report";
import { reportModalState } from "./reactive";


const ReportsModal = props => {
    const reportModal = useReactiveVar(reportModalState);

    const handleClose = () => {
        reportModalState({...reportModal, isShowing: false});
    }

    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog 
            open={reportModal.isShowing} 
            scroll='paper' 
            fullWidth 
            maxWidth='sm' 
            PaperProps={{ sx: { borderRadius: {sm: 0, md: 5} } }}
            fullScreen={Boolean(fullscreen)}
        >
            <DialogTitle sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    Report
                    <IconButton sx={{ ml: 'auto' }} onClick={handleClose}>
                        <Close />
                    </IconButton>
                </DialogTitle>
            <DialogContent dividers={true}>
                <ReportForm/>
            </DialogContent>
            <DialogActions>
                <Typography>Pls, provide more information in text message field, so that we can easier understand what the violation is</Typography>
            </DialogActions>
        </Dialog>
    );
}

export default ReportsModal;