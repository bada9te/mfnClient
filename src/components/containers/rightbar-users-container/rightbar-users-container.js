import { useEffect } from "react";
import Spinner from "../../common/spinner/Spinner";
import { Box, List, Typography } from "@mui/material";
import EnumRightbarUsers from "../../enums/enum-rightbar-users";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersByNick } from "./rightBarUsersContainerSlice";




const RightBarUsersContainer = props => {
    const searchQuery = useSelector(state => state.rightBarUsers.searchQuery);
    const isLoading = useSelector(state => state.rightBarUsersContainer.isLoading);
    const usersData = useSelector(state => state.rightBarUsersContainer.usersData);
    const dispatch = useDispatch()


    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery !== "") {
                dispatch(fetchUsersByNick(searchQuery))
            }
        }, 750);

        return () => {
            clearTimeout(timer);
        }
    }, [searchQuery, dispatch]);


    return (
            <List sx={{overflow: 'auto', position: 'relative', height: '100%'}}>
                {
                    (() => {
                        if (isLoading && searchQuery !== "") {
                            return (
                                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                                    <Spinner/>
                                </Box>
                            );
                        } else if (usersData && usersData.length > 0) {
                            return (
                                <EnumRightbarUsers/>
                            );
                        } else {
                            return (
                                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                                    <Typography>
                                        Start typing nickname to search
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
