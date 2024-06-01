import { Avatar, Box, Card, CardHeader } from "@mui/material";
import LogoClear from "assets/icons/logo_clear.png";

const CategoryCard = props => {
    const { title, color, handleClick } = props;


    return (
        <Card onClick={handleClick} sx={{ 
            //width: {xs: '95%', sm: '375px', md: '400px'}, 
            boxShadow: 5, 
            borderRadius: 5,
            backgroundColor: `${color}95`,
            backdropFilter: 'blur(5px)',
            cursor: 'pointer',
            transition: '500ms', 
            color: 'white',
            ":hover": { transform: 'scale(1.025)', boxShadow: 10 }
        }}>
            <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center', p: 1}}>
                <Avatar src={LogoClear} alt={title} sx={{ m: 1, boxShadow: 5 }}/>
            </Box>
            <CardHeader title={title}/>
        </Card>
    );
}

export default CategoryCard;