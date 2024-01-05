import { Button, ButtonGroup } from "@mui/material";
import { PlaylistPlay, QueueMusic, TrackChanges } from '@mui/icons-material';
import { useTranslation } from "react-i18next";



const TopBarLeftMenu = props => {
    const { handleNavigate, pages } = props;
    const { t } = useTranslation("bars");

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
                    {t(`topbar.${page.toLowerCase()}`)} 
                </Button>
            ))}
        </ButtonGroup>
    );
}

export default TopBarLeftMenu;