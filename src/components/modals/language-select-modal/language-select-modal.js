import { useReactiveVar } from "@apollo/client";
import { Close, Language } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { languageSelectModalState } from "./reactive";
import { baseState } from "../../baseReactive";


const LanguageSelectModal = props => {
    const { isShowing } = useReactiveVar(languageSelectModalState);

    const handleClose = () => {
        languageSelectModalState({ isShowing: false });
    }

    const selectLanguage = (language) => {
        baseState({ ...baseState(), language });
        localStorage.setItem(process.env.REACT_APP_LANGUAGE_VAR_NAME, JSON.stringify({ language }));
        handleClose();
    }

    return (
        <Dialog open={isShowing} scroll='paper' fullWidth maxWidth='sm' PaperProps={{ sx: { borderRadius: 5 } }}>
            <DialogTitle sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    Select language
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