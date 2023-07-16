import ProfileCardEdit from "../../components/common/profile/profile-card-edit/profile-card-edit";
import FormProfileEdit from "../../components/forms/profile-edit/profile-edit";
import { Box, Stack } from "@mui/material";


const ProfileEdit = (props) => {

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
        </>
    );
}


export default ProfileEdit;
