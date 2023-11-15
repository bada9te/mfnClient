import { useReactiveVar } from "@apollo/client";
import { DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { confirmContainerState } from "./reactive";

const ConfirmContainer = props => {
    const { text, title } = useReactiveVar(confirmContainerState);

    return (
        <>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {text}
                </DialogContentText>
            </DialogContent>
        </>
    );
}

export default ConfirmContainer;