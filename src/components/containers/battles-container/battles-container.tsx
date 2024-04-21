import { AddCircle, Timelapse, Whatshot } from "@mui/icons-material";
import { Box, Tabs, Tab, Typography, CardContent } from "@mui/material";
import { useState, useEffect } from "react";
//import PaginationTree from "../../common/pagination/pagination";
import EnumBattles from "../../enums/enum-battles";
import CreateBattleForm from "../../forms/create-battle/create-battle";
import ImageRightFormContainer from "../image-right-form-container/image-right-form.container";
import newBattleFormBG from "../../../assets/bgs/newBattleFormBG.png"
import { useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { battlesContainerState } from "./reactive";
import { useTranslation } from "react-i18next";
import { SpinnerLinear } from "../../common/spinner/Spinner";
import InfoImage from "../../common/info-image/info-image";
import BattlesLogo from "../../../assets/icons/battle-disk.png";
import TabPanel from "../../common/tab-panel/tab-panel";
import { Battle, useBattleMakeVoteMutation, useBattlesByStatusLazyQuery } from "utils/graphql-requests/generated/schema";


function TabContent(props: {
    loading: boolean;
    battles: Battle[];
    makeBattleVote: (battleId: string, postNScore: "post1Score" | "post2Score", voteCount: number, voterId: string) => Promise<void>;
}) {
    const {loading, battles, makeBattleVote} = props;
    const { t } = useTranslation("containers");

    return (
        <>
            {
                (() => {
                    if (loading) {
                        return (
                            <SpinnerLinear/>
                        );
                    } else if (battles?.length === 0) {
                        return (
                            <InfoImage text={t('battles.not_found')} src={BattlesLogo}/>
                        );
                    } else {
                        return (
                            <>
                                <EnumBattles battles={battles || []} makeBattleVote={makeBattleVote}/>
                                { 
                                    //battles?.length > 0 ? <Box sx={{mb: 10}}><PaginationTree/></Box> : null 
                                }
                            </>
                        );
                    } 
                })()
            }
        </>
    );
}


export default function BattlesContainer() {
    const [status, setStatus] = useState(0);
    const { activePage, maxCountPerPage } = useReactiveVar(battlesContainerState);
    const { user: currentUser } = useReactiveVar(baseState);
    const { t } = useTranslation("containers");

    const [ makeVote ] = useBattleMakeVoteMutation();
    const [ getBattles, { data, loading, stopPolling } ] = useBattlesByStatusLazyQuery({
        variables: {
            finished: status === 0,
            offset: activePage === 0 ? maxCountPerPage : (activePage - 1) * maxCountPerPage,
            limit: maxCountPerPage,
        },
        pollInterval: 15000,
    });

    const makeBattleVote = async(battleId: string, postNScore: "post1Score" | "post2Score", voteCount: number, voterId: string) => {
        makeVote({
            variables: {
                input: {
                    battleId, postNScore, voteCount, voterId
                }
            }
        });
        //console.log('MAKE_VOTE');
    }


    const handleTabSwitch = (event: React.SyntheticEvent<Element, Event>, key: number) => {
        setStatus(key);
    }

    useEffect(() => {
        stopPolling();
        if (status < 2) {
            getBattles();
        }
        return () => { stopPolling() }
    }, [status, getBattles, stopPolling]);


    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 1.2 }}>
                <Tabs value={status} onChange={handleTabSwitch} variant="fullWidth">
                    <Tab icon={<Whatshot/>}  label={t('battles.in_progress')} id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                    <Tab icon={<Timelapse/>} label={t('battles.finished')}    id="simple-tab-1" aria-controls="simple-tabpanel-1"/>
                    <Tab icon={<AddCircle/>} label={t('battles.create_new')}  id="simple-tab-2" aria-controls="simple-tabpanel-2"/>
                </Tabs>
            </Box>

            <TabPanel value={status} index={0}>
                <TabContent battles={data?.battlesByStatus?.battles as Battle[]} loading={loading} makeBattleVote={makeBattleVote} />
            </TabPanel>
        
            <TabPanel value={status} index={1}>
                <TabContent battles={data?.battlesByStatus?.battles as Battle[]} loading={loading} makeBattleVote={makeBattleVote} />
            </TabPanel>

            <TabPanel value={status} index={2}>
                <ImageRightFormContainer bg={newBattleFormBG} text={t('battles.create.main_text')}>
                    <Box sx={{width: '30rem', height: 'fit-content', mx: 0, px: 0, boxShadow: 0, borderRadius: 5, mb: {xs: 4, sm: 1, md: 0}}}>
                        {
                            currentUser && currentUser._id !== ""
                            ?
                            <Box sx={{ my: 3 }}>
                                <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', pt: 3, pb: 1.5}}>
                                    {t('battles.create.title')}
                                </Typography>
                                <CardContent>
                                    <CreateBattleForm/>
                                </CardContent>
                            </Box>
                            :
                            <InfoImage text={t('battles.create.login_required')} src={BattlesLogo}/>
                        }
                    </Box>
                </ImageRightFormContainer>
            </TabPanel>
        </Box>
    );
}