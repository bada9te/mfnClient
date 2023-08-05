import ProfileCardEdit from "../../components/common/profile/profile-card-edit/profile-card-edit";
import FormProfileEdit from "../../components/forms/profile-edit/profile-edit";
import { Box, Button, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { Delete } from "@mui/icons-material";
import { deleteAccount } from "../../components/forms/profile-card/profileCardFormSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";


const ProfileEdit = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAccountDelete = async() => {
        dispatch(deleteAccount())
            .then(unwrapResult)
            .then(result => {
                if (result.data.done) {
                    navigate('/logout')
                }
            })
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
            <Button color="error" variant="contained" startIcon={<Delete/>} onClick={handleAccountDelete}>Delete account</Button>
        </>
    );
}


export default ProfileEdit;
