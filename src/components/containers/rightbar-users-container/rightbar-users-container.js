import { useEffect } from "react";
import { SpinnerCircular } from "../../common/spinner/Spinner";
import { Box, List, Typography } from "@mui/material";
import EnumRightbarUsers from "../../enums/enum-rightbar-users";
import { useLazyQuery } from "@apollo/client";
import { USERS_BY_NICKNAME_QUERY } from "../../../graphql-requests/users";
import { useTranslation } from "react-i18next";



const RightBarUsersContainer = props => {
    const { searchQuery } = props;
    const [getUsersByNickname, { data, loading }] = useLazyQuery(USERS_BY_NICKNAME_QUERY);
    const { t } = useTranslation("containers");

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery !== "") {
                getUsersByNickname({
                    variables: {
                        nick: searchQuery,
                    },
                });
            }
        }, 750);

        return () => {
            clearTimeout(timer);
        }
    }, [searchQuery, getUsersByNickname]);


    return (
        <List sx={{overflow: 'auto', position: 'relative', height: '100%', px: 0.5, background: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(5px)', color: 'white'}}>
            {
                (() => {
                    if (loading && searchQuery !== "") {
                        return (
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                                <SpinnerCircular/>
                            </Box>
                        );
                    } else if (data?.usersByNickname && data?.usersByNickname.length > 0) {
                        return (
                            <EnumRightbarUsers users={data.usersByNickname}/>
                        );
                    } else {
                        return (
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                                <Typography>
                                    {t('rightbar.users.info_text')}
                                </Typography>
                            </Box>
                        );
                    }
                })()
            }
        </List>
    );
}

export default RightBarUsersContainer;
