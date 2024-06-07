import { SubmitHandler, useForm } from "react-hook-form";
import PostItem from "../../common/post-item/post-item";
import { Box, TextField, Button, Stack, Typography, Paper, FormGroup } from "@mui/material";
import PostItemUnavailable from "../../common/post-item/post-item-unavailable";
import { postSelectContainerState } from "@/components/containers/post-select-container/reactive";
import { postSelectModalState } from "../../modals/post-select-modal/reactive";
import { useReactiveVar } from "@apollo/client/index.js";
import { useState } from "react";
import { createBattleFormState } from "./reactive";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { useBattleCreateMutation } from "@/utils/graphql-requests/generated/schema";
import { TPostAddons, TPostBase } from "@/components/common/post-item/types";
import { battlesContainerState } from "@/components/containers/battles-container/reactive";


type Inputs = {
    Title: string;
    MyTrack: {base: TPostBase; addons: TPostAddons};
    OpponentsTrack: {base: TPostBase; addons: TPostAddons};
}


export default function CreateBattleForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
    const [ title, setTitle ] = useState("Battle's title");
    const { post1, post2 } = useReactiveVar(createBattleFormState);
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation("forms");

    const [ createBattle ] = useBattleCreateMutation({
        variables: {
            input: {
                title: title,
                post1: post1?.base._id as string,
                post2: post2?.base._id as string,
            },
        },
    })
    
    const handleOpenPostSelectModal = (isMine: boolean) => {
        postSelectContainerState({ ...postSelectContainerState(), isMine });
        postSelectModalState({ ...postSelectModalState(), isShowing: true });
    }


    const onSubmit: SubmitHandler<Inputs> = async() => {
        enqueueSnackbar(t('battle.snack.pending'), { autoHideDuration: 1500 });
        
        await createBattle()
            .then(_ => {
                reset();
                enqueueSnackbar(t('battle.snack.success'), {autoHideDuration: 1500, variant: 'success'});
                battlesContainerState({...battlesContainerState(), activePage: 0})
            }).catch(_ => {
                enqueueSnackbar(t('battle.snack.error'), { autoHideDuration: 3000, variant: 'error' });
            }); 
    }

    return (
        <Paper component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ p: 2, boxShadow: 10, borderRadius: 5}}>
            <Box sx={{ px: 2 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label={t('battle.title')}
                    error={Boolean(errors.Title)}
                    helperText={errors.Title && t('battle.error.title')}
                    onInput={(e: React.FormEvent<HTMLInputElement>) => setTitle((e.target as HTMLInputElement).value)}
                    {...register("Title", {
                        maxLength: 10,
                        minLength: 4,
                        required: true,
                    })}
                />
            </Box>
            
            <Stack direction="column" spacing={2} sx={{ my: 3, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FormGroup sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
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
                </FormGroup>

                <FormGroup sx={{ width: '100%' }}>
                    {
                        post2 != null 
                        ?
                        <PostItem base={{...post2.base}} addons={{...post2.addons, status: null}} />
                        :
                        <Stack direction="column" spacing={2} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <PostItemUnavailable 
                                status="battle-form" 
                                text={t('battle.select_opponents_track')} 
                                selectHandler={() => handleOpenPostSelectModal(false)}
                            />
                            { 
                                errors.OpponentsTrack 
                                && 
                                <Typography sx={{ color: '#f44336', fontSize: 12, width: '100%', pl: 3 }}>
                                    {t('battle.error.post2')}
                                </Typography> 
                            }
                        </Stack>
                    }
                </FormGroup>
            </Stack>
            
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 1, mb: 2, boxShadow: 10 }}
            >
                {t('battle.submit')}
            </Button>
        </Paper>
    );
}
