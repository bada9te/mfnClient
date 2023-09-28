import { AddCircle, Timelapse, Whatshot } from "@mui/icons-material";
import { Box, Tabs, Tab, Card, Typography, CardContent  } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userSocket from "../../../socket/user/socket-user";
import PaginationTree from "../../common/pagination/pagination";
import EnumBattles from "../../enums/enum-battles";
import CreateBattleForm from "../../forms/create-battle/create-battle";
import { fetchBattles, makeVote, setPage } from "./battlesContainerSlice";


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
            <Box sx={{ p: 0 }}>
                {children}
            </Box>
        )}
      </div>
    );
}


const BattlesContainer = props => {
    const [status, setStatus] = useState(0);
    const dispatch = useDispatch();
    const battles = useSelector(state => state?.BattlesContainer?.battles);
    const activePage = useSelector(state => state?.pagination?.activePage);
    const currentUser = useSelector(state => state.base.user);


    const makeBattleVote = async(battleId, postNScore, voteCount, voterId) => {
        dispatch(makeVote({
            battleId, 
            postNScore, 
            voteCount, 
            voterId
        }));

        userSocket.emit("battle-add-vote", {
            battleId, postNScore, voteCount, voterId,
        });
    }


    const handleTabSwitch = (event, key) => {
        setStatus(key);
        if (key === 0) {
            dispatch(setPage("In Progress"));
        } else if (key === 1) {
            dispatch(setPage("Finished"));
        }
    }

    useEffect(() => {
        if (status < 2) {
            dispatch(fetchBattles({status, activePage}))
        }
    }, [activePage, dispatch, status]);


    return (
        <>
            <Box>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3 }}>
                    <Tabs value={status} onChange={handleTabSwitch}>
                        <Tab icon={<Whatshot/>} label={"In progress"} id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                        <Tab icon={<Timelapse/>} label={"Finished"} id="simple-tab-1" aria-controls="simple-tabpanel-1"/>
                        <Tab icon={<AddCircle/>}label="Create new" id="simple-tab-2" aria-controls="simple-tabpanel-2"/>
                    </Tabs>
                </Box>

                <TabPanel value={status} index={0}>
                    <EnumBattles battlesData={battles} makeBattleVote={makeBattleVote}/>
                    {
                        battles?.length > 0 ? <PaginationTree/> : null
                    }
                </TabPanel>
            
                <TabPanel value={status} index={1}>
                    <EnumBattles battlesData={battles} makeBattleVote={makeBattleVote}/>
                    {
                        battles?.length > 0 ? <PaginationTree/> : null
                    }
                </TabPanel>

                <TabPanel value={status} index={2}>
                    {
                        currentUser && currentUser._id !== ""
                        ?
                        <Card sx={{my: 3, boxShadow: 3, borderRadius: 5, mx: {sx: 0, md: 2}}}>
                            <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', pt: 3, mb: 0}}>
                                Create battle
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div" sx={{display: 'flex', justifyContent: 'center', pt: 3, mb: 0}}>
                                Create battle using form below:
                            </Typography>
                            <CardContent>
                                <CreateBattleForm/>
                            </CardContent>
                        </Card>
                        :
                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh'}}>
                            <Typography>
                                Please login to create a new one
                            </Typography>
                        </Box>
                    }
                </TabPanel>
            </Box>
        </>
    );
}


export default BattlesContainer;