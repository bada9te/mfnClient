import { Google, Twitter, Facebook } from "@mui/icons-material";
import { FormGroup, Typography, ButtonGroup, Button } from "@mui/material";



const SocialMediaLogin = (props) => {



    return (
        <FormGroup>
            <Typography sx={{ my: 1 }}>Sign in using social media</Typography>
            <ButtonGroup sx={{ my: 1, display: 'flex', justifyContent: 'center' }} variant='string' orientation="horizontal">
                <Button href="http://localhost:8000/api/auth/google"><Google/></Button>
                <Button href="http://localhost:8000/api/auth/twitter"><Twitter/></Button>
                <Button><Facebook/></Button>
            </ButtonGroup>
        </FormGroup>
    );
}

export default SocialMediaLogin;