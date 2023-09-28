import ProfileCardEdit from "../../components/common/profile/profile-card-edit/profile-card-edit";
import FormProfileEdit from "../../components/forms/profile-edit/profile-edit";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setIsShowing as setConfirmModalIsShowing } from "../../components/modals/confirm-modal/confirmModalSlice";
import { setActionType, setText, setTitle } from "../../components/containers/confirm-container/confirmContainerSlice";


const ProfileEdit = (props) => {
    const dispatch = useDispatch();

    const handleAccountDelete = async() => {
        dispatch(setConfirmModalIsShowing(true));
        dispatch(setActionType("delete-account"));
        dispatch(setText("By confirming this, you agree that your account will be removed without any ability to restore."));
        dispatch(setTitle("Confirm account deletion"));
    } 


    return (
        <>
            <ProfileCardEdit id='0'/>
            <Stack direction="row" sx={{display:"flex", justifyContent: "space-around", alignItems: "center", width: "100%", my: 3}} spacing={0} flexWrap="wrap">
                <Box sx={{display:"flex", justifyContent: "center", alignItems: "center", m: 2}}>
                    <FormProfileEdit title="Nickname" />
                </Box>
                <Box sx={{display:"flex", justifyContent: "center", alignItems: "center", m: 2}}>
                    <FormProfileEdit title="Description" current="aaaaaaaa" />
                </Box>
                <Box sx={{display:"flex", justifyContent: "center", alignItems: "center", m: 2}}>
                    <FormProfileEdit title="Password" />
                </Box>
                <Box sx={{display:"flex", justifyContent: "center", alignItems: "center", m: 2}}>
                    <FormProfileEdit title="Email" current="Current email" />
                </Box>
            </Stack>
            <Box sx={{display:"flex", justifyContent: "center", alignItems: "center", m: 2}}>
                <FormProfileEdit title="Danger Zone" />
            </Box>
            
        </>
    );
}


export default ProfileEdit;
