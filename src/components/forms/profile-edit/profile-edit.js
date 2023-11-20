import { useForm }        from "react-hook-form";
import { Box, Card, CardContent, Typography, Button, TextField, Avatar } from "@mui/material";
import EmailImage    from "../../../images/icons/email.png"
import PasswordImage from "../../../images/icons/password.png"
import TextImage     from "../../../images/icons/text.png"
import ClearImage     from "../../../images/icons/logo_clear.png"
import { Delete } from "@mui/icons-material";
import { confirmContainerState } from "../../containers/confirm-container/reactive";
import { confirmModalState } from "../../modals/confirm-modal/reactive";
import { useMutation, useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { useSnackbar } from "notistack";
import { USER_PREPARE_ACCOUNT_TO_RESTORE_MUTATION, USER_UPDATE_MUTATION } from "../../../graphql/users";


const FormProfileEdit = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { title, current } = props;
    const { user: currentUser } = useReactiveVar(baseState);
    const { enqueueSnackbar } = useSnackbar();
    const [ updateUser ] = useMutation(USER_UPDATE_MUTATION);
    const [ prepareToRestore ] = useMutation(USER_PREPARE_ACCOUNT_TO_RESTORE_MUTATION);

    // form submit
    const onSubmit = async(data) => {
        const keys = Object.keys(data);
        switch (keys.at(keys.length - 1)) {
            case "NewNickname":
                enqueueSnackbar("Updating nickname...", { autoHideDuration: 1500 });
                await updateUser({
                    variables: {
                        input: {
                            _id: currentUser._id,
                            what: "nick",
                            value: data.NewNickname,
                        },
                    },
                }).then(() => {
                    dispatchUser("nick", data.NewNickname);
                    enqueueSnackbar("Nickname updated", { autoHideDuration: 1500 });
                }).catch(err => {
                    enqueueSnackbar("Can't update the nickname", { autoHideDuration: 1500 });
                });
                break;
            case "NewDescription":
                enqueueSnackbar("Updating description...", { autoHideDuration: 1500 });
                await updateUser({
                    variables: {
                        input: {
                            _id: currentUser._id,
                            what: "description",
                            value: data.NewDescription,
                        },
                    },
                }).then(() => {
                    dispatchUser("description", data.NewDescription);
                    enqueueSnackbar("Description updated", { autoHideDuration: 1500, variant: 'success' });
                }).catch(err => {
                    enqueueSnackbar("Can't update the description", { autoHideDuration: 3000, variant: 'error' });
                });
                break;
            case "OldPassword":
                enqueueSnackbar("Preparing to update password...", { autoHideDuration: 1500 });
                await prepareToRestore({
                    variables: {
                        input: {
                            email: currentUser.email,
                            type: "password",
                        },
                    },
                }).then(({ data }) => {
                    enqueueSnackbar("Check your email for next steps", { autoHideDuration: 3000, variant: 'info' })
                }).catch(err => {
                    enqueueSnackbar("Can't update password", { autoHideDuration: 3000, variant: 'error' });
                });
                break;
            case "OldEmail":
                if (data.OldEmail !== currentUser.email) {
                    enqueueSnackbar("Provided email didn't match current email", { autoHideDuration: 3000, variant: 'error' });
                } else {
                    await prepareToRestore({
                        variables: {
                            input: {
                                email: currentUser.email,
                                type: "email",
                            },
                        },
                    }).then(({ data }) => {
                        enqueueSnackbar("Check your email for next steps", { autoHideDuration: 3000, variant: 'info' });
                    }).catch(err => {
                        enqueueSnackbar("Can't update email", { autoHideDuration: 3000, variant: 'error' })
                    });
                }
                break;
            default:
                break;
        }
    }

    const dispatchUser = (what, value) => {
        baseState({
            ...baseState(),
            user: {
                ...currentUser,
                [what]: value,
            },
        });
    }

    const handleAccountDelete = async() => {
        confirmModalState({ ...confirmModalState(), isShowing: true });
        confirmContainerState({ 
            ...confirmContainerState(), 
            actionType: "delete-account", 
            text: "By confirming this, you agree that your account will be removed without any ability to restore.",
            title: "Confirm account deletion",
        });
    } 

    return (
        <>
            <Card sx={{ width: '20rem', height: 'fit-content', boxShadow: 3, borderRadius: 5 }}>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2}}>
                    { title === "Password"    ? <Avatar src={PasswordImage} alt="password" sx={{ m: 1, boxShadow: 5 }}/>  : null }
                    { title === "Nickname"    ? <Avatar src={TextImage} alt="nickname" sx={{ m: 1, boxShadow: 5 }}/> : null }
                    { title === "Description" ? <Avatar src={TextImage} alt="description" sx={{ m: 1, boxShadow: 5 }}/> : null }
                    { title === "Email"       ? <Avatar src={EmailImage} alt="email" sx={{ m: 1, boxShadow: 5 }}/> : null }
                    { title === "Danger Zone" ? <Avatar src={ClearImage} alt="email" sx={{ m: 1, boxShadow: 5 }}/> : null }
                </Box>
                <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', pt: 2, mb: 0}}>
                    { title }
                </Typography>
                <CardContent>
                    <Box component="form" sx={{mx: 2}} onSubmit={handleSubmit(onSubmit)}>
                        { title === "Password"    ? <Password    register={register} errors={errors}/> : null }
                        { title === "Nickname"    ? <Nickname    register={register} errors={errors}/> : null }
                        { title === "Description" ? <Description register={register} errors={errors} current={current}/> : null }
                        { title === "Email"       ? <Email       register={register} errors={errors} current={current}/> : null }
                        { title === "Danger Zone" ? <DangerZone  register={register} errors={errors} handleAccountDelete={handleAccountDelete}/> : null }

                        {
                            title !== "Danger Zone" 
                            &&
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 1, boxShadow: 10 }}
                            >
                                Change { title.toLowerCase() }
                            </Button>
                        }
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}


const Password = (props) => {
    const {register, errors} = props;
    return (
        <>
            <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                error={Boolean(errors.OldPassword)}
                helperText={errors.OldPassword && "Password must be from 4 to 20 characters"}
                {...register("OldPassword", {
                    maxLength: 20,
                    minLength: 8,
                    required: true,
                })} 
            />
        </>
    );
}


const Nickname = (props) => {
    const {register, errors} = props;
    return (
        <>
            <TextField
                margin="normal"
                required
                fullWidth
                id="nickname"
                label="Nickname"
                name="nickname"
                type="text"
                error={Boolean(errors.NewNickname)}
                helperText={errors.NewNickname && "Nickname must be from 4 to 20 characters"}
                {...register("NewNickname", {
                    maxLength: 20,
                    minLength: 4,
                    required: true,
                })} 
            />
        </>
    );
}


const Description = (props) => {
    const {register, errors} = props;
    return(
        <>
            <TextField
                margin="normal"
                required
                fullWidth
                id="newDescription"
                label="Description"
                name="newDescription"
                type="text"
                error={Boolean(errors.NewDescription)}
                helperText={errors.NewNickname && "Description must be from 4 to 20 characters"}
                {...register("NewDescription", {
                    maxLength: 20,
                    minLength: 4,
                    required: true,
                })} 
            />
        </>
    );
}


const Email = (props) => {
    const {register, errors, current} = props;
    return (
        <>
            <TextField
                margin="normal"
                required
                fullWidth
                id="oldEmail"
                label={current}
                name="oldEmail"
                type="text"
                error={Boolean(errors.OldEmail)}
                helperText={errors.OldEmail && "Email is not valid"}
                {...register("OldEmail", {
                    required: true,
                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
            />
        </>
    );
}

const DangerZone = (props) => {
    const {handleAccountDelete} = props;

    return (
        <Button 
            color="error" 
            variant="contained" 
            startIcon={<Delete/>} 
            onClick={handleAccountDelete}
            fullWidth
        >
            Delete account
        </Button>
    );
}


export default FormProfileEdit;
