import { Google, Twitter, Facebook } from "@mui/icons-material";
import { FormGroup, ButtonGroup, Button } from "@mui/material";
import {cfg} from "@/config";


export default function SocialMediaLogin() {
    return (
        <FormGroup>
            <ButtonGroup sx={{ my: 1, display: 'flex', justifyContent: 'center' }} variant='string' orientation="horizontal">
                <Button href={cfg.googleAuthURL}><Google/></Button>
                <Button href={cfg.twitterAuthURL}><Twitter/></Button>
                <Button href={cfg.facebookAuthURL}><Facebook/></Button>
            </ButtonGroup>
        </FormGroup>
    );
}
