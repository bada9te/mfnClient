import { Close } from "@mui/icons-material";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"
import ReportForm from "../../forms/report/report";
import { setIsShowing } from "./reportModalSlice";

const ReportsModal = props => {
    const isShowing = useSelector(state => state.reportModal.isShowing);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setIsShowing(false));
    }

    return (
        <Dialog open={isShowing} scroll='paper' fullWidth maxWidth='sm'>
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
                <Typography>Pls, provide more information in text message field, so that we can more easily understand what the violation is</Typography>
            </DialogActions>
        </Dialog>
    );
}

export default ReportsModal;