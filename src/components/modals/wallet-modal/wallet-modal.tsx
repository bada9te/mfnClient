import { Button, ButtonGroup, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useReactiveVar } from "@apollo/client/index.js";
import { walletConnectModalState } from "./reactive";
import { useTranslation } from "react-i18next";

import {
    useConnectModal,
    useAccountModal,
    useChainModal,
} from '@rainbow-me/rainbowkit';
import { useAccount } from "wagmi";


export default function WalletConnectModal() {
    const walletConnectModal = useReactiveVar(walletConnectModalState);
    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();
    const { openChainModal } = useChainModal();
    const account = useAccount();

    
    const handleClose = () => {
        walletConnectModalState({...walletConnectModalState, isShowing: false});
    }

    const { t } = useTranslation("modals");

    return (
        <Dialog 
            open={walletConnectModal.isShowing} 
            scroll='paper' fullWidth 
            maxWidth='xs' 
            PaperProps={{ sx: { borderRadius: 5 } }}
        >
            <DialogTitle sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                {t('wallet.connect.title')}
                <IconButton sx={{ ml: 'auto' }} onClick={handleClose}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers={true} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                { account.address && <Typography>{account.address}</Typography> }
                <ButtonGroup fullWidth>
                    {openConnectModal && (
                        <Button variant="contained" color="secondary" onClick={openConnectModal}>Connect</Button>
                    )}
                    {openAccountModal && (
                        <Button variant="contained" color="secondary" onClick={openAccountModal}>Account</Button>
                    )}

                    {openChainModal && (
                        <Button variant="contained" color="secondary" onClick={openChainModal}>Switch chain</Button>
                    )}
                </ButtonGroup>
            </DialogContent>
        </Dialog>
    );
}