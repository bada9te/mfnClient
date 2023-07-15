import { Avatar, Card, CardHeader, Button } from "@mui/material";


const UserSelectItem = props => {
    const {id, avatar, nickname, description, userSelectionHandler} = props;


    return (
        <>
            <Card sx={{width: '100%', boxShadow: 3}}>
                <CardHeader
                    avatar={
                        <Avatar 
                            src={avatar} 
                            sx={{bgcolor: "gray", boxShadow: 3}} 
                            aria-label="recipe"
                        />
                    }
                    title={nickname}
                    subheader={description}
                    action={
                        <Button sx={{ mt: 1.2 }} size="small" variant="text" onClick={() => userSelectionHandler(id)}>Select</Button>
                    }
                />
            </Card>
        </>
    );
}

export default UserSelectItem;