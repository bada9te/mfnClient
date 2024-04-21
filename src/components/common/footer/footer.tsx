import { GitHub, Instagram } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

export default function Footer() {
    return (
      <Box
        component="footer"
        sx={{
          py: 10,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.primary.dark,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white',
          scrollSnapAlign: 'start',
          borderRadius: 0
        }}
      >
        <Typography variant="body1" textAlign="center" sx={{mx: 1}}>
          Music From Nothing {new Date().getFullYear()} 
        </Typography>
        <IconButton href="https://github.com/bada9te" target="_blank" sx={{color: 'white'}}><GitHub/></IconButton>
        <IconButton sx={{color: 'white'}}><Instagram/></IconButton>
      </Box>
    );
}