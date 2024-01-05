import ProfileCardEdit from "../../components/common/profile/profile-card-edit/profile-card-edit";
import FormProfileEdit from "../../components/forms/profile-edit/profile-edit";
import { Box, Stack } from "@mui/material";
import BaseContentContainer from "../../components/containers/base-content-container/base-content-container";


const ProfileEdit = (props) => {
    return (
        <BaseContentContainer>
            <ProfileCardEdit id='0'/>
            <Stack direction="row" sx={{display:"flex", justifyContent: "space-around", alignItems: "center", width: "100%", my: 3, mb: 10}} spacing={0} flexWrap="wrap">
                <Box sx={{display:"flex", justifyContent: "center", alignItems: "center", m: 2}}>
                    <FormProfileEdit title="Nickname" />
                </Box>
                <Box sx={{display:"flex", justifyContent: "center", alignItems: "center", m: 2}}>
                    <FormProfileEdit title="Description" />
                </Box>
                <Box sx={{display:"flex", justifyContent: "center", alignItems: "center", m: 2}}>
                    <FormProfileEdit title="Password" />
                </Box>
                <Box sx={{display:"flex", justifyContent: "center", alignItems: "center", m: 2}}>
                    <FormProfileEdit title="Email" />
                </Box>
                <Box sx={{display:"flex", justifyContent: "center", alignItems: "center", m: 2}}>
                    <FormProfileEdit title="Danger_zone" />
                </Box>
            </Stack>
        </BaseContentContainer>
    );
}


export default ProfileEdit;
