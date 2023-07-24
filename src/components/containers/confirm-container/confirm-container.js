import { DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useSelector } from "react-redux";

const ConfirmContainer = props => {
    const text = useSelector(state => state.confirmContainer.text);
    const title = useSelector(state => state.confirmContainer.title);

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