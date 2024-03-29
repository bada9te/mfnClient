import { useReactiveVar } from "@apollo/client";
import { Close, Language } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import { languageSelectModalState } from "./reactive";
import { baseState } from "../../baseReactive";
import { useTranslation } from "react-i18next";


const LanguageSelectModal = props => {
    const { isShowing } = useReactiveVar(languageSelectModalState);
    const { t, i18n } = useTranslation("modals"); 

    const handleClose = () => {
        languageSelectModalState({ isShowing: false });
    }

    const selectLanguage = (language) => {
        i18n.changeLanguage(language);
        baseState({ ...baseState(), language });
        localStorage.setItem(process.env.REACT_APP_LANGUAGE_VAR_NAME, JSON.stringify({ language }));
        handleClose();
    }

    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down('md'));


    return (
        <Dialog 
            open={isShowing} 
            scroll='paper' 
            fullWidth 
            maxWidth='sm' 
            PaperProps={{ sx: { borderRadius: {sm: 0, md: 5} } }}
            fullScreen={Boolean(fullscreen)}
        >
            <DialogTitle sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    {t('select.language.title')}
                    <IconButton sx={{ ml: 'auto' }} onClick={handleClose}>
                        <Close />
                    </IconButton>
                </DialogTitle>
            <DialogContent dividers={true}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => selectLanguage("en")}>
                            <ListItemIcon>
                                <Language/>
                            </ListItemIcon>
                            <ListItemText primary="🇺🇸 English" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => selectLanguage("ua")}>
                            <ListItemIcon>
                                <Language/>
                            </ListItemIcon>
                            <ListItemText primary="🇺🇦 Українська" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => selectLanguage("ru")}>
                            <ListItemIcon>
                                <Language/>
                            </ListItemIcon>
                            <ListItemText primary="🇷🇺 Русский" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </DialogContent>
        </Dialog>
    );
}

export default LanguageSelectModal;