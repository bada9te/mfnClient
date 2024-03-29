import { memo } from 'react';
import { Card, CardHeader, CardContent, Typography, Skeleton, Button } from "@mui/material";
import { Search } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';


const PostItemUnavailable = (props) => {
    const { status, text, selectHandler } = props;
    const { t } = useTranslation("objects");

    return (
            <Card sx={{width: {xs: '95%', sm: '375px', md: '400px'}, boxShadow: 10, borderRadius: 5}}>
                <CardHeader
                    avatar={
                        <Skeleton variant="circular" width={40} height={40} />
                    }
                    title={<Skeleton variant="text" width={100} sx={{ fontSize: '1rem' }} />}
                    subheader={<Skeleton variant="text" width={150} sx={{ fontSize: '1rem' }} />}
                />
                
                <Skeleton variant="rectangular" height={160} />
                { 
                    (() => {
                        if (status !== "in-player" && status !== "battle-form") {
                            return (
                                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: 1, p: 0, paddingBottom: 0, "&:last-child": { paddingBottom: 0 }}}>
                                    <Typography sx={{textAlign: 'center', width: '100%'}}>{t('post.unavailable')}</Typography> 
                                </CardContent>
                            );
                        } else if (status === "battle-form") {
                            return (
                                <CardContent sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    m: 0, 
                                    p: 0, 
                                    paddingBottom: 0, 
                                    "&:last-child": { paddingBottom: 0 }
                                }}>
                                    
                                    <Button 
                                        startIcon={<Search/>}
                                        sx={{ 
                                            borderTopRightRadius: 50,
                                            borderBottomLeftRadius: 25,
                                            borderTopLeftRadius: 0,
                                            borderBottomRightRadius: 0,
                                        }} 
                                        size="small"
                                        variant="contained"  
                                        onClick={selectHandler}
                                    >
                                        {text}
                                    </Button>
                                </CardContent>
                            );
                        }
                    })()
                }
            </Card>
    );
}


export default memo(PostItemUnavailable);

