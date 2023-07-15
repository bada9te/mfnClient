import { useEffect } from 'react';
import * as Alert from "../../../alerts/alerts";
import Spinner from "../../spinner/Spinner";
import { Avatar, Box, Stack, Typography, Button } from "@mui/material";
import "./profile-card.scss";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, handleSubscribtion, setIsLoading, setProfileOwner } from './profileCardSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import userSocket from '../../../../socket/user/socket-user';
import { useNavigate } from 'react-router-dom';


const ProfileCard = (props) => {
    const { id } = props;
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state?.base?.user);
    const locations = useSelector(state => state?.base?.locations);
    const profileCardIsLoading = useSelector(state => state.profileCard.isLoading);
    const profileOwner = useSelector(state => state.profileCard.profileOwner);
    const theme = useSelector(state => state.base.theme);
    const navigate = useNavigate();


    useEffect(() => {
        if (id !== currentUser?._id) {
            dispatch(fetchUserById(id));
        } else {
            dispatch(setProfileOwner(currentUser));
            dispatch(setIsLoading(false));
        }
    }, [id, dispatch, currentUser]);


    const switchSubscriptionOnUser = async(actionType) => {
        dispatch(handleSubscribtion({subscriberId: currentUser._id, profileOwnerId: profileOwner.id}))
            .then(unwrapResult)
            .then(result => {
                if (result.data.done) {
                    console.log(result.data)
                    Alert.alertSuccess("Success");
                    if (actionType === 'subscribe') {
                        userSocket.emit("user-was-subscribed", {
                            receiver: profileOwner.id,
                            sender: currentUser._id,
                            text: `${currentUser.nick} has just subscribed on you`,
                        });
                    }
            } else {
                Alert.alertError("Sth went wrong");
            }
        });
    }
    
    return (
        <>
            {
                profileCardIsLoading
                ?
                <Box sx={{m: 3, minHeight: '200px', display: 'flex', alignItems: 'center'}}>
                    <Spinner/>
                </Box>     
                :
                <Box sx={{
                    boxShadow: 3,  
                    backgroundImage: `url(${locations?.images}/${profileOwner?.background})`, 
                    backgroundRepeat: 'no-repeat', 
                    backgroundSize: 'cover', 
                    objectFit: 'contain', 
                    backgroundColor: theme !== 'light' ? '#1e1e1e' : 'white', 
                }}>
                    <Box sx={{
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        boxShadow: 3,
                    }}>
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
                                boxShadow: 3
                            }}
                            direction="row" 
                            useFlexGap
                            flexWrap="wrap"
                        >
                            <Avatar 
                                alt={profileOwner.nick} 
                                sx={{boxShadow: 3, fontSize: 100}} 
                                src={profileOwner?.avatar !== "" ? `${locations?.images}/${profileOwner?.avatar}` : "NULL"}
                                style={{objectFit: 'contain', width: '35vw', height: '35vw', maxHeight: '160px', maxWidth: '160px'}}
                                
                                >
                            </Avatar>
                            <Box>
                                <Typography variant='h4'>{profileOwner?.nick}</Typography>
                                <Typography variant='h6'>{profileOwner?.description}</Typography>
                            </Box>
                            <Box>
                                <Typography>Following {profileOwner?.subscribedOn?.length || 0}</Typography>
                                <Typography>Subscribers {profileOwner?.subscribers?.length}</Typography>
                                {
                                    (() => {
                                        if (currentUser?._id !== profileOwner.id && currentUser._id !== "" && currentUser) {
                                            if (currentUser?.subscribedOn.includes(profileOwner.id)) {
                                                return (
                                                    <Button 
                                                        sx={{ mt: 1.5 }} 
                                                        variant="contained"
                                                        onClick={() => switchSubscriptionOnUser('unsubscribe')}
                                                    >
                                                        Unsubscribe
                                                    </Button>
                                                )
                                            } else {
                                                return (
                                                    <Button 
                                                        sx={{ mt: 1.5 }} 
                                                        variant="contained"
                                                        onClick={() => switchSubscriptionOnUser('subscribe')}
                                                    >
                                                        Subscribe
                                                    </Button>
                                                )
                                            }
                                        } else if (currentUser._id === "") {
                                            return (
                                                <Button 
                                                    sx={{ mt: 1.5 }} 
                                                    variant="contained"
                                                    onClick={() => navigate('/login')}
                                                >
                                                    Login to subscribe
                                                </Button>
                                            );
                                        }
                                    })()
                                }
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            }
        </>
    );
}


export default ProfileCard;
