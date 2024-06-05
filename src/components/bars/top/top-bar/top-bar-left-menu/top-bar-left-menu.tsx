import { Button, ButtonGroup } from "@mui/material";
import { Category, Chat, PlaylistPlay, QueueMusic, TrackChanges } from '@mui/icons-material';
import { useTranslation } from "react-i18next";



export default function TopBarLeftMenu(props: {
    handleNavigate: (where: string) => void;
    pages: string[];
}) {
    const { handleNavigate, pages } = props;
    const { t } = useTranslation("bars");

    return (
        <ButtonGroup variant="text">
            {pages.map((page, key) => (
                <Button
                    key={key}
                    onClick={() => handleNavigate(page)}
                    color="secondary"
                    variant="contained"
                    sx={{ my: 2, display: 'flex', alignItems: 'center' }}
                    startIcon={
                        <>
                            {page === "Feed"       && <QueueMusic/>  }
                            {page === "Battles"    && <TrackChanges/>}
                            {page === "Playlists"  && <PlaylistPlay/>}
                            {page === "Categories" && <Category/>    }
                            {page === "Chats"      && <Chat/>        }
                        </>
                    }
                >
                    {t(`topbar.${page.toLowerCase()}`)} 
                </Button>
            ))}
        </ButtonGroup>
    );
}
