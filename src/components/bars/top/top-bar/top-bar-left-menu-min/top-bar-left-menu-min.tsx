import { MenuItem, Typography } from "@mui/material";
import { Category, Chat, PlaylistPlay, QueueMusic, TrackChanges } from '@mui/icons-material';
import { useTranslation } from "react-i18next";


export default function TopBarLeftMenuMin(props: {
    handleNavigate: (where: string) => void;
    pages: string[];
}) {
    const {handleNavigate, pages} = props;
    const { t } = useTranslation("bars");

    return (
        <>
            {
                pages.map((item, key) => {
                    return (
                        <MenuItem onClick={() => handleNavigate(item)} key={key}>
                            <Typography textAlign="center" display="flex" alignItems="center">
                                { item === "Feed"       && <QueueMusic sx={{mr: 1}}/>   }
                                { item === "Battles"    && <TrackChanges sx={{mr: 1}}/> }
                                { item === "Playlists"  && <PlaylistPlay sx={{mr: 1}}/> }
                                { item === "Categories" && <Category sx={{mr: 1}}/>     }
                                { item === "Chats"      && <Chat sx={{mr: 1}}/>         }
                                { t(`topbar.${item.toLowerCase()}`)                     }
                            </Typography>
                        </MenuItem>
                    );
                })
            }
            
        </>
    );
}