import { SpinnerLinear } from "../../spinner/Spinner";
import { Avatar, Box, Stack, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import ProfileDefaultBGImage from "assets/bgs/profileDefaultBG.png";
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { USER_QUERY, USER_SWITCH_SUBSCRIPTION_MUTATION } from 'utils/graphql-requests/users';
import { baseState } from "components/baseReactive";
import { useSnackbar } from "notistack";
import { CREATE_NOTIFICATION_MUTATION } from "utils/graphql-requests/notifications";
import { useTranslation } from "react-i18next";
import socket from "utils/socket/socket";


export default function ProfileCard(props: {
    id: string;
    bgRadius?: number;
}) {
    const { id } = props;
    const { user: currentUser, theme, locations } = useReactiveVar(baseState);
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation("objects");

    const navigate = useNavigate();

    const { data: userData, loading: userLoading } = useQuery(USER_QUERY, { 
        variables: { 
            _id: id,
        },
        pollInterval: 15000
    });
    const [ createSubscriptionNotification ] = useMutation(CREATE_NOTIFICATION_MUTATION, {
        variables: {
            input: {
                receiver: id,
                sender: currentUser._id,
                text: "Has just subscribed on you!",
            }
        } 
    });

    const [ switchSubscriptionOnUser, { loading: subsLoading } ] = useMutation(USER_SWITCH_SUBSCRIPTION_MUTATION, { 
        variables: {
            input: {
                subscriberId: currentUser?._id,
                userId: id,
            }
        },
        update: (cache, { data }) => {
            cache.writeQuery({
                query: USER_QUERY,
                variables: { _id: id },
                data: {
                    user: data.userSwitchSubscription.user1
                }
            });
            baseState({ 
                ...baseState(), 
                user: { 
                    ...currentUser, 
                    subscribedOn: [ ...data.userSwitchSubscription.user2.subscribedOn ] as any
                } 
            });
        }
    });

    const switchSubscriptionOnUserHandler = async(actionType: "subscribe" | "unsubscribe") => {
        enqueueSnackbar(t('profile.snack.pending'), { autoHideDuration: 1500 });

        switchSubscriptionOnUser()
            .then(() => {
                enqueueSnackbar(t('profile.snack.success'), { autoHideDuration: 1500, variant: 'success' });
                
                // notify user about new subscriber
                const dataToEmit = { userId: currentUser._id, toUsers: [id] };
                if (actionType === 'subscribe') {
                    createSubscriptionNotification();
                    socket.emit('user subscribed', dataToEmit);
                } else {
                    socket.emit('user unsubscribed', dataToEmit);
                }
            }).catch(() => {
                enqueueSnackbar(t('profile.snack.error'), { autoHideDuration: 3000, variant: 'error' });
            });
    }
    
    return (
        <>
            {
                userLoading || subsLoading
                ?
                <Box sx={{minHeight: '200px', m: 2}}>
                    <SpinnerLinear/>
                </Box>     
                :
                <Box sx={{
                    m: 2,
                    boxShadow: 10,  
                    backgroundImage: userData?.user.background ? `url(${locations?.images}/${userData?.user.background})` : `url(${ProfileDefaultBGImage})`, 
                    backgroundRepeat: 'no-repeat', 
                    backgroundSize: 'cover', 
                    objectFit: 'contain', 
                    backgroundColor: theme !== 'light' ? '#1e1e1e' : 'white', 
                    borderRadius: '20px',
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 0 }}>
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
                                borderRadius: 5,
                                boxShadow: 3,
                                transition: '500ms',
                                ":hover": { transform: 'scale(1.025)', boxShadow: 10 }
                            }}
                            direction="row" 
                            useFlexGap
                            flexWrap="wrap"
                        >
                            <Avatar 
                                alt={userData?.user.nick} 
                                sx={{boxShadow: 3, fontSize: 100}} 
                                src={userData?.user?.avatar !== "" ? `${locations?.images}/${userData?.user?.avatar}` : "NULL"}
                                style={{objectFit: 'contain', width: '35vw', height: '35vw', maxHeight: '160px', maxWidth: '160px'}}
                            />
                            <Box>
                                <Typography variant='h4'>{userData?.user?.nick}</Typography>
                                <Typography variant='h6'>{userData?.user?.description}</Typography>
                            </Box>
                            <Box>
                                <Typography>{t('profile.following')} {userData?.user?.subscribedOn?.length || 0}</Typography>
                                <Typography>{t('profile.subscribers')} {userData?.user?.subscribers?.length}</Typography>
                                {
                                    (() => {
                                        if (currentUser?._id !== userData?.user._id && currentUser._id !== "") {
                                            if (userData?.user.subscribers.map((i: any) => i._id).includes(currentUser._id)) {
                                                return (
                                                    <Button sx={{ mt: 1.5, width: '120px' }} variant="contained" onClick={() => switchSubscriptionOnUserHandler('unsubscribe')}>
                                                        {t('profile.unsubscribe')}
                                                    </Button>
                                                )
                                            } else {
                                                return (
                                                    <Button sx={{ mt: 1.5, width: '120px' }} variant="contained" onClick={() => switchSubscriptionOnUserHandler('subscribe')}>
                                                        {t('profile.subscribe')}
                                                    </Button>
                                                )
                                            }
                                        } else if (currentUser._id === "") {
                                            return (
                                                <Button sx={{ mt: 1.5 }} variant="contained" onClick={() => navigate('/app/login')}>
                                                    {t('profile.login_to_subscribe')}
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
