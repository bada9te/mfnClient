import { SubmitHandler, useForm }        from "react-hook-form";
import { Box, Button, TextField, FormGroup } from "@mui/material";
/*
import EmailImage    from "../../../images/icons/email.png"
import PasswordImage from "../../../images/icons/password.png"
import TextImage     from "../../../images/icons/text.png"
import ClearImage     from "../../../images/icons/logo_clear.png"
*/
import { Email, Save } from "@mui/icons-material";
//import { confirmContainerState } from "../../containers/confirm-container/reactive";
//import { confirmModalState } from "../../modals/confirm-modal/reactive";
import { useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import ProfileEditPartSocial from "./profile-edit-social";
import { useUserPrepareAccountToRestoreMutation, useUserUpdateMutation } from "utils/graphql-requests/generated/schema";


type Inputs = {
    NewNickname: string;
    NewDescription: string;
    OldPassword: string;
    OldEmail: string;
}



function SubmitBtn(props: {
    text: string;
    icon: JSX.Element;
}) {
    return (
        <Button type="submit" color="secondary" fullWidth variant="contained" sx={{ mt: 3, mb: 1, boxShadow: 10 }} startIcon={props.icon}>
            {props.text}
        </Button>
    );
}

export default function FormProfileEdit(props: {
    part: number;
}) {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const { user: currentUser } = useReactiveVar(baseState);
    const { enqueueSnackbar } = useSnackbar();
    const [ updateUser ] = useUserUpdateMutation();
    const [ prepareToRestore ] = useUserPrepareAccountToRestoreMutation();
    const { t } = useTranslation("forms");

    // form submit
    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        const keys = Object.keys(data);
        switch (keys.at(keys.length - 1)) {
            case "NewNickname":
                enqueueSnackbar(t('profile.snack.nick.pending'), { autoHideDuration: 1500 });
                await updateUser({
                    variables: {
                        input: { _id: currentUser._id, what: "nick", value: data.NewNickname },
                    },
                }).then(() => {
                    dispatchUser("nick", data.NewNickname);
                    enqueueSnackbar(t('profile.snack.nick.success'), { autoHideDuration: 1500 });
                }).catch(err => {
                    enqueueSnackbar(t('profile.snack.nick.error'), { autoHideDuration: 1500 });
                });
                break;
            case "NewDescription":
                enqueueSnackbar(t('profile.snack.description.pending'), { autoHideDuration: 1500 });
                await updateUser({
                    variables: {
                        input: { _id: currentUser._id, what: "description", value: data.NewDescription,},
                    },
                }).then(() => {
                    dispatchUser("description", data.NewDescription);
                    enqueueSnackbar(t('profile.snack.description.success'), { autoHideDuration: 1500, variant: 'success' });
                }).catch(err => {
                    enqueueSnackbar(t('profile.snack.description.error'), { autoHideDuration: 3000, variant: 'error' });
                });
                break;
            case "OldPassword":
                enqueueSnackbar(t('profile.snack.password.pending'), { autoHideDuration: 1500 });
                await prepareToRestore({
                    variables: {
                        input: { email: currentUser.local.email, type: "password" },
                    },
                }).then(({ data }) => {
                    enqueueSnackbar(t('profile.snack.password.success'), { autoHideDuration: 3000, variant: 'info' })
                }).catch(err => {
                    enqueueSnackbar(t('profile.snack.password.error'), { autoHideDuration: 3000, variant: 'error' });
                });
                break;
            case "OldEmail":
                enqueueSnackbar(t('profile.snack.email.pending'), { autoHideDuration: 1500 });
                if (data.OldEmail !== currentUser.local.email) {
                    enqueueSnackbar(t('profile.snack.email.error_match'), { autoHideDuration: 3000, variant: 'error' });
                } else {
                    await prepareToRestore({
                        variables: {
                            input: { email: currentUser.local.email, type: "email" },
                        },
                    }).then(({ data }) => {
                        enqueueSnackbar(t('profile.snack.email.success'), { autoHideDuration: 3000, variant: 'info' });
                    }).catch(err => {
                        enqueueSnackbar(t('profile.snack.email.error'), { autoHideDuration: 3000, variant: 'error' })
                    });
                }
                break;
            default:
                break;
        }
    }

    const dispatchUser = (what: string, value: string) => {
        baseState({
            ...baseState(),
            user: {
                ...currentUser,
                [what]: value,
            },
        });
    }

    /*
    const handleAccountDelete = async() => {
        confirmModalState({ ...confirmModalState(), isShowing: true });
        confirmContainerState({ 
            ...confirmContainerState(), 
            actionType: "delete-account", 
            text: "By confirming this, you agree that your account will be removed without any ability to restore.",
            title: "Confirm account deletion",
        });
    } 
    */

    return (
        <Box component="form" sx={{mx: 1}} onSubmit={handleSubmit(onSubmit)}>
        {
            (() => {
                switch(props.part) {
                    case 1:
                        return (
                            <>
                                <TextField margin="normal" required fullWidth id="nickname"label={t('profile.nickname')} type="text"
                                    error={Boolean(errors.NewNickname)}
                                    helperText={errors.NewNickname && t('profile.error.nickname')}
                                    {...register("NewNickname", {
                                        maxLength: 20,
                                        minLength: 4,
                                        required: true,
                                    })} 
                                />
                                <TextField margin="normal" required fullWidth id="newDescription" label={t('profile.description')} type="text"
                                    error={Boolean(errors.NewDescription)}
                                    helperText={errors.NewDescription && t('profile.error.description"')}
                                    {...register("NewDescription", {
                                        maxLength: 20,
                                        minLength: 4,
                                        required: true,
                                    })} 
                                />
                                <SubmitBtn text="Save changes" icon={<Save/>}/>
                            </>
                        );
                    case 2: 
                        return (
                            <>
                                <FormGroup sx={{display: 'flex', flexWrap: 'wrap', direction: 'row'}}>
                                    <TextField fullWidth margin="normal" required id="password" label={t('profile.current_password')} type="password"
                                        error={Boolean(errors.OldPassword)}
                                        helperText={errors.OldPassword && t('profile.error.passwor')}
                                        {...register("OldPassword", {
                                            maxLength: 20,
                                            minLength: 8,
                                            required: true,
                                        })}
                                    />
                                </FormGroup>
                                <SubmitBtn text="Request password restore email" icon={<Email/>}/>
                            </>
                        );
                    case 3: 
                        return (
                            <>
                                <TextField margin="normal" required fullWidth id="oldEmail" label={t('profile.current_email')} type="text"
                                    error={Boolean(errors.OldEmail)}
                                    helperText={errors.OldEmail && t('profile.error.email')}
                                    {...register("OldEmail", {
                                        required: true,
                                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    })}
                                />
                                <SubmitBtn text="Request an email" icon={<Email/>}/>
                            </>
                        );
                    case 4: 
                        return (<ProfileEditPartSocial/>);
                    default:
                        break;
                }
            })()
        }
        </Box>
    );
}
