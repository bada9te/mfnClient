import { useEffect } from "react";
import { SpinnerCircular } from "@/components/common/spinner/Spinner";
import { Box, List, Typography } from "@mui/material";
import EnumRightbarUsers from "@/components/enums/enum-rightbar-users";
import { useTranslation } from "react-i18next";
import { useUsersByNicknameLazyQuery } from "@/utils/graphql-requests/generated/schema";


function RightBarUsersContainer(props: {
    searchQuery: string;
}) {
    const { searchQuery } = props;
    const [getUsersByNickname, { data, loading }] = useUsersByNicknameLazyQuery();
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
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column', gap: 2}}>
                                <Typography>{t('rightbar.users.info_text')}</Typography>
                            </Box>
                        );
                    }
                })()
            }
        </List>
    );
}

export default RightBarUsersContainer;
