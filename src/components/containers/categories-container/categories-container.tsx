import { Category, QueueMusic } from "@mui/icons-material";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import { useState } from "react"
import { useTranslation } from "react-i18next";
import TabPanel from "../../common/tab-panel/tab-panel";
import EnumCategories from "../../enums/enum-categories";
import PostsContainer from "../posts-container/posts-container";



function CategoriesContainer() {
    const [ category, setCategory ] = useState<null | string>(null);
    const [ status, setStatus ] = useState(0);
    const genres = [
        { title: "Country",          color: '#f44336' }, 
        { title: "Pop",              color: '#e91e63' }, 
        { title: "Classical",        color: '#9c27b0' }, 
        { title: "Funk",             color: '#673ab7' }, 
        { title: "Soul music",       color: '#3f51b5' }, 
        { title: "Hip hop",          color: '#2196f3' },
        { title: "Rock",             color: '#009688' },
        { title: "Electronic music", color: '#4caf50' },
        { title: "Latin",            color: '#00a0b2' },
        { title: "Jazz",             color: '#ff9800' },
        { title: "Blues",            color: '#ff5722' },
        { title: "Folk",             color: '#b2102f' },
        { title: "Metal",            color: '#637bfe' },
    ];
    const { t } = useTranslation("containers");

    const handleCategoryClick = (category: string) => {
        setCategory(category);
        setStatus(1);
    }

    const handleTabSwitch = (event: React.SyntheticEvent<Element, Event>, key: number) => {
        setStatus(key);
    }

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 1.2 }}>
                <Tabs value={status} onChange={handleTabSwitch} variant="fullWidth">
                    <Tab icon={<Category/>}  label={t('categories.select')} id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                    <Tab icon={<QueueMusic/>} label={category || t('categories.selected')} id="simple-tab-1" aria-controls="simple-tabpanel-1"/>
                </Tabs>
            </Box>

            <TabPanel value={status} index={0}>
                <Stack 
                    spacing={2} 
                    sx={{
                        width: '100%', 
                        pt: 2,
                        px: 0.75,
                        display: 'flex', 
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }} 
                    direction="row" 
                    useFlexGap 
                    flexWrap="wrap" 
                >
                    <EnumCategories categories={genres} handleClick={handleCategoryClick}/>
                </Stack>
            </TabPanel>
        
            <TabPanel value={status} index={1}>
                <PostsContainer category={category as string} profileLinkAccessable={true}/>
            </TabPanel>
        </Box>
    );
}


export default CategoriesContainer;