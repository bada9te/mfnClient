import { useReactiveVar } from "@apollo/client";
import { Close } from "@mui/icons-material";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import ReportForm from "@/components/forms/report/report";
import { reportModalState } from "./reactive";
import { useTranslation } from "react-i18next";


const ReportsModal = props => {
    const reportModal = useReactiveVar(reportModalState);
    const { t } = useTranslation("modals");

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
                    {t('report.title')}
                    <IconButton sx={{ ml: 'auto' }} onClick={handleClose}>
                        <Close />
                    </IconButton>
                </DialogTitle>
            <DialogContent dividers={true}>
                <ReportForm/>
            </DialogContent>
            <DialogActions>
                <Typography>{t('report.info_text')}</Typography>
            </DialogActions>
        </Dialog>
    );
}

export default ReportsModal;