import { Avatar, Card, CardHeader, Button } from "@mui/material";
import { useTranslation } from "react-i18next";


export default function UserSelectItem(props: {
    id: string;
    avatar: string;
    nickname: string;
    description: string;
    userSelectionHandler: (id: string) => void;
}) {
    const {id, avatar, nickname, description, userSelectionHandler} = props;
    const { t } = useTranslation("objects");

    return (
        <Card sx={{width: '100%', boxShadow: 3}}>
            <CardHeader
                avatar={
                    <Avatar src={avatar}  sx={{bgcolor: "gray", boxShadow: 3}}  aria-label="recipe" alt={nickname} />
                }
                title={nickname}
                subheader={description}
                action={
                    <Button sx={{ mt: 1.2 }} size="small" variant="text" onClick={() => userSelectionHandler(id)}>{t('select.user.item.select')}</Button>
                }
            />
        </Card>
    );
}
