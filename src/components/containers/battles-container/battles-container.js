import { AddCircle, Timelapse, Whatshot } from "@mui/icons-material";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import PaginationTree from "../../common/pagination/pagination";
import EnumBattles from "../../enums/enum-battles";
import CreateBattleForm from "../../forms/create-battle/create-battle";
import ImageRightFormContainer from "../image-right-form-container/image-right-form.container";
import newBattleFormBG from "../../../images/bgs/newBattleFormBG.png"
import { useLazyQuery, useMutation, useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { battlesContainerState } from "./reactive";
import { BATTLES_BY_STATUS_QUERY, BATTLE_MAKE_VOTE_MUTATION } from "../../../graphql-requests/battles";


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
    const { activePage, maxCountPerPage } = useReactiveVar(battlesContainerState);
    const { user: currentUser } = useReactiveVar(baseState);

    const [ makeVote ] = useMutation(BATTLE_MAKE_VOTE_MUTATION);
    const [ getBattles, { data, loading, stopPolling } ] = useLazyQuery(BATTLES_BY_STATUS_QUERY, {
        variables: {
            status: status === 0 ? "running" : "finished",
            offset: activePage === 0 ? maxCountPerPage : (activePage - 1) * maxCountPerPage,
            limit: maxCountPerPage,
        },
        pollInterval: 15000,
    });

    const makeBattleVote = async(battleId, postNScore, voteCount, voterId) => {
        makeVote({
            variables: {
                input: {
                    battleId, postNScore, voteCount, voterId
                }
            }
        });
        console.log('MAKE_VOTE');
    }


    const handleTabSwitch = (event, key) => {
        setStatus(key);
    }

    useEffect(() => {
        stopPolling();
        if (status < 2) {
            getBattles();
        }
    }, [status]);


    return (
        <Box height={'100%'}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 1.2 }}>
                <Tabs value={status} onChange={handleTabSwitch} variant="fullWidth">
                    <Tab icon={<Whatshot/>} label={"In progress"} id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                    <Tab icon={<Timelapse/>} label={"Finished"} id="simple-tab-1" aria-controls="simple-tabpanel-1"/>
                    <Tab icon={<AddCircle/>}label="Create new" id="simple-tab-2" aria-controls="simple-tabpanel-2"/>
                </Tabs>
            </Box>

            <TabPanel value={status} index={0}>
                <EnumBattles battles={data?.battlesByStatus.battles || []} loading={loading} makeBattleVote={makeBattleVote}/>
                { data?.battlesByStatus.battles.length > 0 ? <Box sx={{mb: 10}}><PaginationTree/></Box> : null }
            </TabPanel>
        
            <TabPanel value={status} index={1}>
                <EnumBattles battles={data?.battlesByStatus.battles || []} loading={loading} makeBattleVote={makeBattleVote}/>
                { data?.battlesByStatus.battles.length > 0 ? <Box sx={{mb: 10}}><PaginationTree/></Box> : null }
            </TabPanel>

            <TabPanel value={status} index={2}>
                <ImageRightFormContainer bg={newBattleFormBG} text="Ready for a challenge?">
                    <Box sx={{width: '30rem', height: 'fit-content', boxShadow: 0, borderRadius: 5, mb: {xs: 4, sm: 1, md: 0}}}>
                        {
                            currentUser && currentUser._id !== ""
                            ?
                            <Box sx={{ mb: 3 }}>
                                <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', pt: 3, mb: 0}}>
                                    Create battle
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div" sx={{display: 'flex', justifyContent: 'center', pt: 3, mb: 0}}>
                                    Create battle using form below:
                                </Typography>
                                <CreateBattleForm/>
                            </Box>
                            :
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh'}}>
                                <Typography>
                                    Please login to create a new one
                                </Typography>
                            </Box>
                        }
                    </Box>
                </ImageRightFormContainer>
            </TabPanel>
        </Box>
    );
}


export default BattlesContainer;