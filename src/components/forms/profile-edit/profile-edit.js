import { useForm } from "react-hook-form";
import { httpUpdateUser } from "../../../requests/users";
import * as Alert from "../../alerts/alerts";
import { Box, Card, CardContent, Typography, Button, TextField, Avatar } from "@mui/material";
import EmailImage from "../../../images/email.png"
import PasswordImage from "../../../images/password.png"
import TextImage from "../../../images/text.png"
import { useDispatch, useSelector } from "react-redux";
import { updatePartOfUser } from "../../baseSlice";
import { prepareToRestore } from "../account-restore-request/accountRestoreRequestFormSlice";
import { unwrapResult } from "@reduxjs/toolkit";


const FormProfileEdit = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { title, current } = props;
    const currentUser = useSelector(state => state?.base?.user);
    const dispatch = useDispatch();

    // form submit
    const onSubmit = async(data) => {
        let result = null;
        const keys = Object.keys(data);
        switch (keys.at(keys.length - 1)) {
            case "NewNickname":
                result = await httpUpdateUser(currentUser?._id, data.NewNickname, "nick");
                dispatchUser("nick", data.NewNickname);
                break;
            case "NewDescription":
                result = await httpUpdateUser(currentUser?._id, data.NewDescription, "description");
                dispatchUser("description", data.NewDescription);
                break;
            case "OldPassword":
                dispatch(prepareToRestore({email: currentUser.email, type: "password"}))
                    .then(unwrapResult)
                    .then(result => {
                        if(result.data.done) {
                            const user = result.data.user;
                            if (user) {
                                Alert.alertSuccess('Check your email for next steps');
                            } else {
                                Alert.alertError('Account is not found');
                            }
                        }
                    });
                //result = await httpUpdateUser(currentUser?._id, data.NewPassword, "password");
                break;
            case "OldEmail":
                if (data.OldEmail !== currentUser.email) {
                    Alert.alertWarning('Emails did not match');
                } else {
                    dispatch(prepareToRestore({email: data.OldEmail, type: "email"}))
                        .then(unwrapResult)
                        .then(result => {
                            if(result.data.done) {
                                const user = result.data.user;
                                if (user) {
                                    Alert.alertSuccess('Check your email for next steps');
                                } else {
                                    Alert.alertError('Account is not found');
                                }
                            }
                        });
                }
                //dispatchUser("email", data.NewEmail);
                break;
            default:
                break;
        }

        if (result) {
            if (result.data.done) {
                Alert.alertSuccess("Updated");
            } else {
                Alert.alertSuccess("Can't update the profile");
            }
        }
    }

    const dispatchUser = (what, value) => {
        dispatch(updatePartOfUser({what, value}));
    }
    

    return (
        <>
            <Card sx={{ width: '20rem', height: 'fit-content', boxShadow: 3 }}>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2}}>
                    { title === "Password"    ? <Avatar src={PasswordImage} alt="password" sx={{ m: 1, bgcolor: 'secondary.main' }}/>  : null }
                    { title === "Nickname"    ? <Avatar src={TextImage} alt="nickname" sx={{ m: 1, bgcolor: 'secondary.main' }}/> : null }
                    { title === "Description" ? <Avatar src={TextImage} alt="description" sx={{ m: 1, bgcolor: 'secondary.main' }}/> : null }
                    { title === "Email"       ? <Avatar src={EmailImage} alt="email" sx={{ m: 1, bgcolor: 'secondary.main' }}/> : null }
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

                        <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 1 }}
                            >
                                Change { title.toLowerCase() }
                        </Button>
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
                helperText={errors.OldPassword && "Password is not valid"}
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
                helperText={errors.NewNickname && "Nickname is not valid"}
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
                helperText={errors.NewDescription && "Description is not valid"}
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
                    minLength: 4,
                    required: true,
                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
            />
        </>
    );
}


export default FormProfileEdit;
