import { MenuItem, Typography } from "@mui/material";
import { PlaylistPlay, QueueMusic, TrackChanges } from '@mui/icons-material';
import { useTranslation } from "react-i18next";


const TopBarLeftMenuMin = props => {
    const {handleNavigate, pages} = props;
    const { t } = useTranslation("bars");

    return (
        <>
            {
                pages.map((item, key) => {
                    return (
                        <MenuItem onClick={() => handleNavigate(item)} key={key}>
                            <Typography textAlign="center" display="flex" alignItems="center">
                                {item === "Feed" ? <QueueMusic sx={{mr: 1}}/> : null}
                                {item === "Battles" ? <TrackChanges sx={{mr: 1}}/> : null}
                                {item === "Playlists" ? <PlaylistPlay sx={{mr: 1}}/> : null}
                                {t(`topbar.${item.toLowerCase()}`)}
                            </Typography>
                        </MenuItem>
                    );
                })
            }
            
        </>
    );
}

export default TopBarLeftMenuMin;