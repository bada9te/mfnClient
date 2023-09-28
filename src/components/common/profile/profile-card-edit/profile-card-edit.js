import './profile-card-edit.scss';
import ProfileCardForm from '../../../forms/profile-card/profile-card';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';


const ProfileCardEdit = (props) => {
    const currentUser = useSelector(state => state?.base?.user);
    const locations = useSelector(state => state?.base?.locations);
    const theme = useSelector(state => state?.base?.theme);

    return (
        <>
            <Box sx={{
                boxShadow: 2,  
                backgroundImage: currentUser?.background ? `url(${locations?.images}/${currentUser?.background})` : null, 
                backgroundRepeat: 'no-repeat', 
                backgroundSize: 'cover', 
                objectFit: 'contain', 
                backgroundColor: theme !== 'light' ? '#1e1e1e' : 'white', 
                }}
            >
                <Box sx={{
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center'
                    }}
                >
                    <Stack 
                        spacing={3} 
                        sx={{
                            display: 'flex', 
                            justifyContent: 'space-around', 
                            alignItems: 'center', 
                            backgroundColor: theme !== 'light' ? '#333' : 'white', 
                            color: theme !== 'light' ? 'white' : '#292A2A',
                            m: 2, 
                            p: 2, 
                            borderRadius: 3,
                            boxShadow: 2
                        }}
                        direction="row" 
                        useFlexGap
                        flexWrap="wrap"
                    >
                        <Avatar
                            alt={currentUser?.nick} 
                            sx={{boxShadow: 3, fontSize: 100, boxShadow: 5}} 
                            src={currentUser?.avatar !== "" ? `${locations?.images}/${currentUser?.avatar}` : "NULL"}
                            style={{objectFit: 'contain', width: '35vw', height: '35vw', maxHeight: '160px', maxWidth: '160px'}}
                            >
                        </Avatar>
                        <Box>
                            <Typography variant='h4'>{currentUser?.nick}</Typography>
                            <Typography variant='h6'>{currentUser?.description}</Typography>
                        </Box>
                        <Box>
                            <ProfileCardForm/>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </>
    );
}

export default ProfileCardEdit;
