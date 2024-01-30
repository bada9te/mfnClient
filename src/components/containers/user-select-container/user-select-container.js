import { useQuery, useReactiveVar } from "@apollo/client";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography, Checkbox } from "@mui/material";
import { USERS_BY_IDS_QUERY } from "../../../utils/graphql-requests/users";
import { baseState } from "../../baseReactive";
import { userSelectContainerState } from "./reactive";
import { useTranslation } from "react-i18next";
import { SpinnerCircular } from "../../common/spinner/Spinner";
import { CHATS_USER_RELATED_BY_USER_ID_QUERY } from "../../../utils/graphql-requests/chats";
import { useEffect, useState } from "react";
 

const UserSelectContainer = props => {
    const { except, includeChats } = props;
    const { user: currentUser } = useReactiveVar(baseState);
    const { checked } = useReactiveVar(userSelectContainerState);
    const [ visibleData, setVisibleData ] = useState([]);
    const { data: users, loading: usersLoading } = useQuery(USERS_BY_IDS_QUERY, {
        variables: {
            ids: currentUser.subscribedOn,
        },
    });
    const { data: chats, loading: chatsLoading } = useQuery(CHATS_USER_RELATED_BY_USER_ID_QUERY, {
        variables: {
            _id: currentUser._id
        }
    });
    const { t } = useTranslation("containers");


    // handle element toggle in list
    const handleToggle = (value) => () => {
        const currentIndex = checked.map(i => i._id).indexOf(value._id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        
        userSelectContainerState({...userSelectContainerState(), checked: newChecked})
    };


    useEffect(() => {
        if (includeChats) {
            if (users?.usersByIds && chats?.chatsUserRelatedByUserId) {
                setVisibleData([...users.usersByIds, ...chats.chatsUserRelatedByUserId]);
            }
        } else {
            if (users?.usersByIds) {
                setVisibleData(users.usersByIds);
            }
        }
    }, [users, chats, includeChats]);
    

    return (
        <>
            {
                visibleData.length === 0 
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
                                    if (usersLoading || chatsLoading) {
                                        return (
                                            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <SpinnerCircular/>
                                            </Box>
                                        );
                                    } else if (!visibleData.length || visibleData.filter(i => !except.map(j => j._id).includes(i._id)).length === 0) {
                                        return (
                                            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <Typography>{t('select.user.not_found')}</Typography>
                                            </Box>
                                        );
                                    } else {
                                        return (
                                            <>
                                                {
                                                    visibleData.filter(i => !except.map(j => j._id).includes(i._id)).map((item, key) => {
                                                        return (
                                                            <ListItemButton key={key} role="listitem" onClick={handleToggle({_id: item._id, __typename: item.__typename})}>
                                                                <ListItemIcon>
                                                                    <Checkbox checked={checked.map(i => i._id).indexOf(item._id) !== -1} tabIndex={-1}/>
                                                                </ListItemIcon>
                                                                <ListItemText 
                                                                    id={`transfer-list-all-item-${item._id}-label`} 
                                                                    primary={
                                                                        (() => {
                                                                            switch (item.__typename) {
                                                                                case "Chat": return `Chat "${item.title}"`
                                                                                case "User": return item.nick
                                                                                default:     return
                                                                            }
                                                                        })()
                                                                    } 
                                                                />
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