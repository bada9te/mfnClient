import { useReactiveVar } from "@apollo/client";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography, Checkbox } from "@mui/material";
import { baseState } from "../../baseReactive";
import { userSelectContainerState } from "./reactive";
import { useTranslation } from "react-i18next";
import { SpinnerCircular } from "../../common/spinner/Spinner";
import { useEffect, useState } from "react";
import { useChatsUserRelatedByUserIdQuery, useUsersByIdsQuery } from "utils/graphql-requests/generated/schema";
 

export default function UserSelectContainer(props: {
    except: {_id: string}[];
    includeChats: boolean;
}) {
    const { except, includeChats } = props;
    const { user: currentUser } = useReactiveVar(baseState);
    const { checked } = useReactiveVar(userSelectContainerState);
    const [ visibleData, setVisibleData ] = useState<any[]>([]);

    const { data: users, loading: usersLoading } = useUsersByIdsQuery({
        variables: {
            ids: currentUser.subscribedOn,
        },
    });
    const { data: chats, loading: chatsLoading } = useChatsUserRelatedByUserIdQuery({
        variables: {
            _id: currentUser._id
        }
    })
    const { t } = useTranslation("containers");


    // handle element toggle in list
    const handleToggle = (value: { _id: string, __typename: string }) => () => {
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
