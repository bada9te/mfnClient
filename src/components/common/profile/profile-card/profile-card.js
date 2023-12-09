import { SpinnerLinear } from "../../spinner/Spinner";
import { Avatar, Box, Stack, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import ProfileDefaultBGImage from "../../../../images/bgs/profileDefaultBG.png";
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { USER_QUERY, USER_SWITCH_SUBSCRIPTION_MUTATION } from '../../../../graphql-requests/users';
import { baseState } from "../../../baseReactive";
import { useSnackbar } from "notistack";


const ProfileCard = (props) => {
    const { id, bgRadius } = props;
    const { user: currentUser, theme, locations } = useReactiveVar(baseState);
    const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate();

    const { data: userData, loading: userLoading } = useQuery(USER_QUERY, { 
        variables: { 
            _id: id,
        },
    });
    const [switchSubscriptionOnUser, { data: subscribeData, loading: subscribeLoading }] = useMutation(USER_SWITCH_SUBSCRIPTION_MUTATION, { 
        variables: {
            input: {
                subscriberId: currentUser?._id,
                userId: id,
            }
        },
        refetchQueries: [
            { query: USER_QUERY, variables: { _id: id } }
        ],
    });


    const switchSubscriptionOnUserHandler = async(actionType) => {
        enqueueSnackbar("Pending...", { autoHideDuration: 1500 });
        /*
        Alert.alertPromise("Pending...", "Success", "Sth went wrong", () => {
            return new Promise(async(resolve, reject) => {
                await switchSubscriptionOnUser()
                    .then(({ data }) => {
                        const { user1: ownerOfTheProfile, user2: actionEmitter } = data.userSwitchSubscription;
                        baseState({ ...baseState(), user: actionEmitter });
                        resolve();
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        });

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
        */   
    }
    
    return (
        <>
            {
                userLoading
                ?
                <Box sx={{minHeight: '200px'}}>
                    <SpinnerLinear/>
                </Box>     
                :
                <Box sx={{
                    boxShadow: 10,  
                    backgroundImage: userData?.user.background ? `url(${locations?.images}/${userData?.user.background})` : `url(${ProfileDefaultBGImage})`, 
                    backgroundRepeat: 'no-repeat', 
                    backgroundSize: 'cover', 
                    objectFit: 'contain', 
                    backgroundColor: theme !== 'light' ? '#1e1e1e' : 'white', 
                    borderRadius: bgRadius ? bgRadius : 0,
                }}>
                    <Box sx={{
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        boxShadow: 0,
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
                                alt={userData?.user.nick} 
                                sx={{boxShadow: 3, fontSize: 100}} 
                                src={userData?.user?.avatar !== "" ? `${locations?.images}/${userData?.user?.avatar}` : "NULL"}
                                style={{objectFit: 'contain', width: '35vw', height: '35vw', maxHeight: '160px', maxWidth: '160px'}}
                                
                                >
                            </Avatar>
                            <Box>
                                <Typography variant='h4'>{userData?.user?.nick}</Typography>
                                <Typography variant='h6'>{userData?.user?.description}</Typography>
                            </Box>
                            <Box>
                                <Typography>Following {userData?.user?.subscribedOn?.length || 0}</Typography>
                                <Typography>Subscribers {userData?.user?.subscribers?.length}</Typography>
                                {
                                    (() => {
                                        if (currentUser?._id !== userData?.user._id && currentUser._id !== "") {
                                            if (currentUser?.subscribedOn.map(i => i._id).includes(userData?.user._id)) {
                                                return (
                                                    <Button 
                                                        sx={{ mt: 1.5, width: '120px' }} 
                                                        variant="contained"
                                                        onClick={() => switchSubscriptionOnUserHandler('unsubscribe')}
                                                    >
                                                        Unsubscribe
                                                    </Button>
                                                )
                                            } else {
                                                return (
                                                    <Button 
                                                        sx={{ mt: 1.5, width: '120px' }} 
                                                        variant="contained"
                                                        onClick={() => switchSubscriptionOnUserHandler('subscribe')}
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
                                                    onClick={() => navigate('/app/login')}
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
