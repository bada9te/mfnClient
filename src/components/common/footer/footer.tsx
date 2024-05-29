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
        //backgroundColor: (theme) => theme.palette.primary.dark,
        //background: 'rgb(128,237,153)',
        background: 'linear-gradient(90deg, rgba(128,237,153,1) 0%, rgba(42,113,146,1) 35%, rgba(10,209,200,1) 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white',
        scrollSnapAlign: 'start',
        margin: 2,
        borderRadius: 5,
        boxShadow: 5,
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