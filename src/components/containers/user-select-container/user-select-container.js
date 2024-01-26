import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography, Checkbox } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { CREATE_NOTIFICATION_MUTATION } from "../../../utils/graphql-requests/notifications";
import { USERS_BY_IDS_QUERY } from "../../../utils/graphql-requests/users";
import { baseState } from "../../baseReactive";
import { userSelectModalState } from "../../modals/user-select-modal/reactive";
import { userSelectContainerState } from "./reactive";
import { useTranslation } from "react-i18next";
import { SpinnerCircular } from "../../common/spinner/Spinner";
 

const UserSelectContainer = props => {
    const { user: currentUser } = useReactiveVar(baseState);
    const { selectType, sharedItem: sharedItemId, checked } = useReactiveVar(userSelectContainerState);
    const { data, loading } = useQuery(USERS_BY_IDS_QUERY, {
        variables: {
            ids: currentUser.subscribedOn,
        },
    });
    const [ createPostShareNotification ] = useMutation(CREATE_NOTIFICATION_MUTATION)
    const userSelectModal = useReactiveVar(userSelectModalState);
    const { t } = useTranslation("containers");


    // handle element toggle in list
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        
        userSelectContainerState({...userSelectContainerState(), checked: newChecked})
    };

    /*
    const handleUserSelect = () => {
        enqueueSnackbar(t('select.user.snack.pending'), { autoHideDuration: 1500 });
        const promises = [];
        if (selectType === 'postShare') {
            checked.forEach(userId => {
                promises.push(() => {
                    createPostShareNotification({
                        variables: {
                            input: {
                                receiver: userId,
                                sender: currentUser._id,
                                post: sharedItemId,
                                text: 'Hey! Check this track!',
                            }
                        }
                    });
                })
            })
        } else if (selectType === 'chatCreate') {
            // code ...
        }

        Promise.all(promises)
        .then(() => {
            enqueueSnackbar(t('select.user.snack.success'), { autoHideDuration: 1500, variant: 'success' });
        }).catch(() => {
            enqueueSnackbar(t('select.user.snack.error'), { autoHideDuration: 3000, variant: 'error' });
        });
        userSelectModalState({ ...userSelectModal, isShowing: false })
    }*/
    

    return (
        <>
            {
                !data?.usersByIds || data?.usersByIds.length === 0 
                ?
                <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <Typography>
                        {t('select.user.not_found')}
                    </Typography>
                </Box>
                :
                <>
                    <Paper sx={{ boxShadow: 10, my: 3 }}>
                        <List
                            sx={{
                                height: 200,
                                overflow: 'auto',
                            }}
                            dense
                            component="div"
                            role="list"
                        >
                            {
                                (() => {
                                    if (loading) {
                                        return (
                                            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <SpinnerCircular/>
                                            </Box>
                                        );
                                    } else if (!data.usersByIds.length) {
                                        return (
                                            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <Typography>{t('chat_create.user.not_found')}</Typography>
                                            </Box>
                                        );
                                    } else {
                                        return (
                                            <>
                                                {
                                                    data.usersByIds.map((value, key) => {
                                                        return (
                                                            <ListItemButton key={key} role="listitem" onClick={handleToggle(value)}>
                                                                <ListItemIcon>
                                                                    <Checkbox checked={checked.indexOf(value) !== -1} tabIndex={-1}/>
                                                                </ListItemIcon>
                                                                <ListItemText id={`transfer-list-all-item-${value}-label`} primary={`${value}`} />
                                                            </ListItemButton>
                                                        );
                                                    })
                                                }
                                            </>
                                        );
                                    }
                                })()
                            }
                        </List>
                    </Paper>
                </>
            }
        </>
    );
}

export default UserSelectContainer;