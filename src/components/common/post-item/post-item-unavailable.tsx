import { Card, CardHeader, CardContent, Typography, Skeleton, Button } from "@mui/material";
import { Search } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { TPostStatus } from './types';


export default function PostItemUnavailable(props: {
    status?: TPostStatus;
    text?: string;
    selectHandler?: () => void;
    hideText?: boolean;
}) {
    const { status, text, selectHandler, hideText } = props;
    const { t } = useTranslation("objects");

    return (
            <Card sx={{width: {xs: '100%', sm: '375px'}, boxShadow: 10, borderRadius: 5}}>
                <CardHeader
                    avatar={
                        <Skeleton variant="circular" width={40} height={40} />
                    }
                    title={<Skeleton variant="text" width={100} sx={{ fontSize: '1rem' }} />}
                    subheader={<Skeleton variant="text" width={150} sx={{ fontSize: '1rem' }} />}
                />
                
                <Skeleton variant="rectangular" height={160} sx={{ width: {xs: '100%', sm: '375px'} }}/>
                { 
                    (() => {
                        if (status !== "in-player" && status !== "battle-form") {
                            return (
                                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: 1, p: hideText ? 3 : 0, paddingBottom: 0, "&:last-child": { paddingBottom: 0 }}}>
                                    { !hideText && <Typography sx={{textAlign: 'center', width: '100%'}}>{t('post.unavailable')}</Typography> }
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
