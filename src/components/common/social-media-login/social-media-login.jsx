import { Google, Twitter, Facebook } from "@mui/icons-material";
import { FormGroup, ButtonGroup, Button } from "@mui/material";



export default function SocialMediaLogin() {
    return (
        <FormGroup>
            <ButtonGroup sx={{ my: 1, display: 'flex', justifyContent: 'center' }} variant='string' orientation="horizontal">
                <Button href={process.env.REACT_APP_GOOGLE_AUTH}><Google/></Button>
                <Button href={process.env.REACT_APP_TWITTER_AUTH}><Twitter/></Button>
                <Button href={process.env.REACT_APP_FACEBOOK_AUTH}><Facebook/></Button>
            </ButtonGroup>
        </FormGroup>
    );
}
