import { GitHub, Instagram } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

const Footer = props => {
    return (
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.primary.dark,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        <Typography variant="body1" textAlign="center" sx={{mx: 1}}>
          Music From Nothing {new Date().getFullYear()} 
        </Typography>
        <IconButton href="https://github.com/bada9te" target="_blank"><GitHub/></IconButton>
        <IconButton><Instagram/></IconButton>
      </Box>
    );
}

export default Footer;