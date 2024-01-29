import { useQuery, useReactiveVar } from "@apollo/client";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography, Checkbox } from "@mui/material";
import { USERS_BY_IDS_QUERY } from "../../../utils/graphql-requests/users";
import { baseState } from "../../baseReactive";
import { userSelectContainerState } from "./reactive";
import { useTranslation } from "react-i18next";
import { SpinnerCircular } from "../../common/spinner/Spinner";
 

const UserSelectContainer = props => {
    const { except } = props;
    const { user: currentUser } = useReactiveVar(baseState);
    const { checked } = useReactiveVar(userSelectContainerState);
    const { data, loading } = useQuery(USERS_BY_IDS_QUERY, {
        variables: {
            ids: currentUser.subscribedOn,
        },
    });
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
                    <Paper sx={{ boxShadow: 10, my: 3, borderRadius: 5 }}>
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
                                    } else if (!data.usersByIds.length || data.usersByIds.filter(i => !except.map(j => j._id).includes(i._id)).length === 0) {
                                        return (
                                            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <Typography>{t('select.user.not_found')}</Typography>
                                            </Box>
                                        );
                                    } else {
                                        return (
                                            <>
                                                {
                                                    data.usersByIds.filter(i => !except.map(j => j._id).includes(i._id)).map((user, key) => {
                                                        return (
                                                            <ListItemButton key={key} role="listitem" onClick={handleToggle(user._id)}>
                                                                <ListItemIcon>
                                                                    <Checkbox checked={checked.indexOf(user._id) !== -1} tabIndex={-1}/>
                                                                </ListItemIcon>
                                                                <ListItemText id={`transfer-list-all-item-${user._id}-label`} primary={`${user.nick}`} />
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