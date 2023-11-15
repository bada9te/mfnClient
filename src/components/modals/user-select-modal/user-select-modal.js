import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import UserSelectContainer from "../../containers/user-select-container/user-select-container";
import { useReactiveVar } from "@apollo/client";
import { userSelectModalState } from "./reactive";


const UserSelectModal = props => {
    const userSelectModal = useReactiveVar(userSelectModalState);
    

    const handleClose = () => {
        userSelectModalState({...userSelectModal, isShowing: false});
    }
    

    return (
        <Dialog open={userSelectModal.isShowing} scroll='paper' fullWidth maxWidth='sm'>
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
