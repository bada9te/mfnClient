import { useReactiveVar } from "@apollo/client/index.js";
import { DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { confirmContainerState } from "./reactive";

export default function ConfirmContainer() {
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

