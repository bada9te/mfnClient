import { useEffect } from "react";
import { SpinnerCircular } from "../../common/spinner/Spinner";
import { Box, List, Typography } from "@mui/material";
import EnumLeftBarPosts from "../../enums/enum-leftbar-posts";
import { useLazyQuery } from "@apollo/client";
import { POSTS_BY_TITLE_QUERY } from "../../../graphql-requests/posts";
import { useTranslation } from "react-i18next";


const LeftBarPostsContainer = props => {
    const { searchQuery } = props;
    const [ getPostsByTitle, { data, loading } ] = useLazyQuery(POSTS_BY_TITLE_QUERY);
    const { t } = useTranslation("containers");

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery !== "") {
                getPostsByTitle({
                    variables: {
                        input: {
                            title: searchQuery,
                            userId: null,
                            userIsOwner: null,
                        },
                    },
                });
            }
        }, 750);

        return () => {
            clearTimeout(timer);
        }
    }, [searchQuery, getPostsByTitle]);


    return (
            <List sx={{overflow: 'auto', position: 'relative', height: '100%', px: 0.5}}>
                {
                    (() => {
                        if (loading && searchQuery !== "") {
                            return (
                                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                                    <SpinnerCircular/>
                                </Box>
                            );
                        } else if (data?.postsByTitle && data?.postsByTitle.length > 0) {
                            return (
                                <EnumLeftBarPosts posts={data.postsByTitle}/>
                            );
                        } else {
                            return (
                                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                                    <Typography>
                                        {t('leftbar.posts.info_text')}
                                    </Typography>
                                </Box>
                            );
                        }
                    })()
                }
            </List>
    );
}

export default LeftBarPostsContainer;
