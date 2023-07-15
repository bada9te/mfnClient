import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setIsShowing } from "./userSelectModalSlice";
import UserSelectContainer from "../../containers/user-select-container/user-select-container";


const UserSelectModal = props => {
    const dispatch = useDispatch();
    const isShowing = useSelector(state => state.userSelectModal.isShowing);
    

    const handleClose = () => {
        dispatch(setIsShowing(false));
    }
    

    return (
        <Dialog open={isShowing} scroll='paper' fullWidth maxWidth='sm'>
            <DialogTitle sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    Select user
                    <IconButton sx={{ ml: 'auto' }} onClick={handleClose}>
                        <Close />
                    </IconButton>
                </DialogTitle>
            <DialogContent dividers={true}>
                <UserSelectContainer/>
            </DialogContent>
        </Dialog>
    );
}


export default UserSelectModal;
