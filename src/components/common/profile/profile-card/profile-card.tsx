import { SpinnerLinear } from "../../spinner/Spinner";
import { Avatar, Box, Stack, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import ProfileDefaultBGImage from "@/assets/bgs/profileDefaultBG.png";
import { useReactiveVar } from '@apollo/client/index.js';
import { USER_QUERY } from '@/utils/graphql-requests/users';
import { baseState } from "@/components/baseReactive";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import socket from "@/utils/socket/socket";
import {
    useNotificationCreateMutation,
    User,
    useUserLazyQuery,
    useUserSwitchSubscriptionMutation
} from "@/utils/graphql-requests/generated/schema.ts";
import {useEffect, useState} from "react";


export default function ProfileCard(props: {
    id: string;
    bgRadius?: number;
    prefetchedUser?: User;
    inRightBar?: boolean;
}) {
    const { id, prefetchedUser, inRightBar } = props;
    const { user: currentUser, theme, locations } = useReactiveVar(baseState);
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation("objects");
    const [ uData, setUData ] = useState<User | undefined>(undefined);
    const navigate = useNavigate();

    const [fetchUserData, {data: userData, loading: userLoading}] = useUserLazyQuery({
        variables: {
            _id: id,
        },
        pollInterval: 15000
    });

    const [ createSubscriptionNotification ] = useNotificationCreateMutation({
        variables: {
            input: {
                receiver: id,
                sender: currentUser._id,
                text: "Has just subscribed on you!",
            }
        }
    });

    const [ switchSubscriptionOnUser, { loading: subsLoading } ] = useUserSwitchSubscriptionMutation({
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
                    user: data?.userSwitchSubscription.user1
                }
            });
            //...data?.userSwitchSubscription?.user2?.subscribedOn
            baseState({
                ...baseState(),
                user: {
                    ...currentUser,
                    subscribedOn: data?.userSwitchSubscription.user2.subscribedOn as any,
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

    useEffect(() => {
        if (!prefetchedUser && id) {
            fetchUserData().then(({data}) => {
                setUData({ ...data?.user, email: "unknown" } as User);
            });
        } else {
            setUData(prefetchedUser);
        }
    }, []);
    
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
                    boxShadow: 10,  
                    backgroundImage: uData?.background ? `url(${locations?.images}/${uData?.background})` : `url(${ProfileDefaultBGImage})`,
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
                                ":hover": { transform: 'scale(1.025)', boxShadow: 10 },
                                width: '100%'
                            }}
                            direction={inRightBar ? "column" : "row"}
                            useFlexGap
                            flexWrap="wrap"
                        >
                            <Avatar 
                                alt={uData?.nick}
                                sx={{boxShadow: 3, fontSize: 100}}
                                src={uData?.avatar !== "" ? `${locations?.images}/${uData?.avatar}` : "NULL"}
                                style={{objectFit: 'contain', width: '35vw', height: '35vw', maxHeight: '160px', maxWidth: '160px'}}
                            />
                            <Box>
                                <Typography variant='h4'>{uData?.nick}</Typography>
                                <Typography variant='h6'>{uData?.description}</Typography>
                            </Box>
                            <Box>
                                <Typography>{t('profile.following')} {uData?.subscribedOn?.length || 0}</Typography>
                                <Typography>{t('profile.subscribers')} {uData?.subscribers?.length || 0}</Typography>
                                {
                                    (() => {
                                        if (uData?._id !== userData?.user._id && currentUser._id !== "") {
                                            if (uData?.subscribers?.map((i: any) => i._id).includes(currentUser._id)) {
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
                                        } else if (uData?._id === "") {
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
