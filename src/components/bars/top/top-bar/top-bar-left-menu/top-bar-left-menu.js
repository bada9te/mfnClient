import { Button, ButtonGroup } from "@mui/material";
import { PlaylistPlay, QueueMusic, TrackChanges } from '@mui/icons-material';



const TopBarLeftMenu = props => {
    const {handleNavigate, pages} = props;


    return (
        <ButtonGroup variant='string'>
            {pages.map((page, key) => (
                <Button
                    key={key}
                    onClick={() => handleNavigate(page)}
                    sx={{ my: 2, color: 'white', display: 'flex', alignItems: 'center' }}
                    startIcon={
                        <>
                            {page === "Feed" ? <QueueMusic/> : null}
                            {page === "Battles" ? <TrackChanges/> : null}
                            {page === "Playlists" ? <PlaylistPlay/> : null}
                        </>
                    }
                >
                    {page}
                </Button>
            ))}
        </ButtonGroup>
    );
}

export default TopBarLeftMenu;