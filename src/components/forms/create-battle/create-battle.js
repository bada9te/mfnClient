import { useForm } from "react-hook-form";
import PostItem from "../../common/post-item/post-item";
import { Box, TextField, Button, Stack, Typography, Card } from "@mui/material";
import PostItemUnavailable from "../../common/post-item/post-item-unavailable";
import { postSelectContainerState } from "../../containers/post-select-container/reactive";
import { postSelectModalState } from "../../modals/post-select-modal/reactive";
import { useMutation, useReactiveVar } from "@apollo/client";
import { useState } from "react";
import { createBattleFormState } from "./reactive";
import { useSnackbar } from "notistack";
import { BATTLE_CREATE_MUTATTION } from "../../../graphql-requests/battles";
import { useTranslation } from "react-i18next";



const CreateBattleForm = props => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [ title, setTitle ] = useState("Battle's title");
    const { post1, post2 } = useReactiveVar(createBattleFormState);
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation("forms");

    const [ createBattle ] = useMutation(BATTLE_CREATE_MUTATTION, {
        variables: {
            input: {
                title: title,
                post1: post1?.base._id,
                post2: post2?.base._id,
            },
        },
    });
    
    const handleOpenPostSelectModal = (isMine) => {
        postSelectContainerState({ ...postSelectContainerState(), isMine });
        postSelectModalState({ ...postSelectModalState(), isShowing: true });
    }


    const onSubmit = async(data) => {
        enqueueSnackbar(t('battle.snack.pending'), { autoHideDuration: 1500 });
        
        await createBattle()
            .then(({ data }) => {
                reset();
                enqueueSnackbar(t('battle.snack.success'), {autoHideDuration: 1500, variant: 'success'});
            }).catch(err => {
                enqueueSnackbar(t('battle.snack.error'), { autoHideDuration: 3000, variant: 'error' });
            });
    }

    return (
        <Card component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{py: 1, px: 2, boxShadow: 10, borderRadius: 5}}>
            <Box sx={{ px: 2 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label={t('battle.title')}
                    name="title"
                    error={Boolean(errors.Title)}
                    helperText={errors.Title && t('battle.error.title')}
                    onInput={(e) => setTitle(e.target.value)}
                    {...register("Title", {
                        maxLength: 10,
                        minLength: 4,
                        required: true,
                    })}
                />
            </Box>
            
            <Stack direction="column" spacing={2} sx={{ my: 3, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <>
                    {
                        post1 != null 
                        ?
                        <PostItem base={{...post1.base}} addons={{...post1.addons, status: null}} />
                        :
                        <Stack direction="column" spacing={2} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <PostItemUnavailable 
                                status="battle-form" 
                                text={t('battle.select_my_track')} 
                                selectHandler={() => handleOpenPostSelectModal(true)}
                                innerRef={
                                    {...register("MyTrack", {
                                        required: true,
                                    })}
                                }
                            />
                            { 
                                errors.MyTrack 
                                && 
                                <Typography sx={{ color: '#f44336', fontSize: 12, width: '100%', pl: 3 }}>
                                    {t('battle.error.post1')}
                                </Typography> 
                            }
                        </Stack>
                    }
                </>

                <>
                    {
                        post1 != null 
                        ?
                        <PostItem base={{...post1.base}} addons={{...post1.addons, status: null}} />
                        :
                        <Stack direction="column" spacing={2} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <PostItemUnavailable 
                                status="battle-form" 
                                text={t('battle.select_opponents_track')} 
                                selectHandler={() => handleOpenPostSelectModal(false)}
                                innerRef={
                                    {...register("MyTrack", {
                                        required: true,
                                    })}
                                }
                            />
                            { 
                                errors.MyTrack 
                                && 
                                <Typography sx={{ color: '#f44336', fontSize: 12, width: '100%', pl: 3 }}>
                                    {t('battle.error.post2')}
                                </Typography> 
                            }
                        </Stack>
                    }
                </>
                
            </Stack>
            
            <Box sx={{mx: 2}}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 2, boxShadow: 10 }}
                >
                    {t('battle.submit')}
                </Button>
            </Box>
        </Card>
    );
}

export default CreateBattleForm;

