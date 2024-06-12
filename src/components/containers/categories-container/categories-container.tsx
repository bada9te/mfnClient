import { Category, QueueMusic } from "@mui/icons-material";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import {useEffect, useState} from "react"
import { useTranslation } from "react-i18next";
import TabPanel from "@/components/common/tab-panel/tab-panel";
import EnumCategories from "@/components/enums/enum-categories";
import PostsContainer from "../posts-container/posts-container";
import { genres } from "@/config";
import {categoriesContainerState} from "@/components/containers/categories-container/reactive.ts";



function CategoriesContainer() {
    const categoriesContainer = categoriesContainerState();
    const [ category, setCategory ] = useState<null | string>(categoriesContainer.selectedCategory);
    const [ status, setStatus ] = useState(categoriesContainer.openedTab);
    const { t } = useTranslation("containers");

    const handleCategoryClick = (category: string) => {
        setCategory(category);
        setStatus(1);
    }

    const handleTabSwitch = (_: React.SyntheticEvent<Element, Event>, key: number) => {
        setStatus(key);
    }

    useEffect(() => {
        categoriesContainer.selectedCategory && setCategory(categoriesContainer.selectedCategory);
        categoriesContainer.openedTab && setStatus(categoriesContainer.openedTab);
    }, [categoriesContainer.openedTab, categoriesContainer.selectedCategory]);

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
                        px: 2,
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