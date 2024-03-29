import ProfileCardEdit from "../components/common/profile/profile-card-edit/profile-card-edit";
import FormProfileEdit from "../components/forms/profile-edit/profile-edit";
import { Avatar, Box, CardContent, CardHeader, Paper, Stack } from "@mui/material";
import BaseContentContainer from "../components/containers/base-content-container/base-content-container";
import EmailImage    from "../assets/icons/email.png"
import PasswordImage from "../assets/icons/password.png"
import TextImage     from "../assets/icons/text.png"
import ClearImage     from "../assets/icons/logo_clear.png"
import { useReactiveVar } from "@apollo/client";
import { baseState } from "../components/baseReactive";

const ProfileEdit = (props) => {
    const { user: currentUser } = useReactiveVar(baseState);

    return (
        <BaseContentContainer>
            <ProfileCardEdit id='0'/>
            <Paper sx={{ height: 'fit-content', boxShadow: 10, borderRadius: 5, m: 2 }}>
                <CardContent>
                    <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center', p: 1}}>
                        <Avatar src={TextImage} alt="Basic information" sx={{ m: 1, boxShadow: 5 }}/>
                    </Box>
                    <CardHeader title="Basic information"/>
                    <FormProfileEdit part={1} />
                </CardContent>
            </Paper>

            {
                currentUser.local.email
                &&
                <Paper sx={{ height: 'fit-content', boxShadow: 10, borderRadius: 5, m: 2 }}>
                    <CardContent>
                        <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center', p: 1}}>
                            <Avatar src={PasswordImage} alt="Password" sx={{ m: 1, boxShadow: 5 }}/>
                            <Avatar src={EmailImage} alt="Email" sx={{ m: 1, boxShadow: 5 }}/>
                        </Box>
                        <CardHeader title="Password and email"/>
                        <Stack spacing={2} >
                            <FormProfileEdit part={2} />
                            <FormProfileEdit part={3} />
                        </Stack>
                    </CardContent>
                </Paper>
            }

            <Paper sx={{ height: 'fit-content', boxShadow: 10, borderRadius: 5, m: 2 }}>
                <CardContent>
                    <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center', p: 1}}>
                        <Avatar src={ClearImage} alt="email" sx={{ m: 1, boxShadow: 5 }}/>
                    </Box>
                    <CardHeader title="Social connections"/>
                    <FormProfileEdit part={4} />
                </CardContent>
            </Paper>
        </BaseContentContainer>
    );
}


export default ProfileEdit;
