import { Paper } from "@mui/material";
import { SpinnerCircular } from "../spinner/Spinner";
import "./page-loader.scss";

export default function PageLoader(props: {
    loading: boolean;
}) {
    const { loading } = props;

    return (
        <Paper style={{
                opacity: loading ? 1 : 0,
                transition: `opacity ${loading ? '0s' : '.4s'}`,
                position: 'absolute',
                width: '100%',
                marginTop: '55px',
                minHeight: 'calc(100vh - 110px)',
                zIndex: loading ? 99 : 0,
                //backgroundColor: 'rgba($color: white, $alpha: 0.5)',
                //backdropFilter: 'blur(12px)',
            }} 
            className="loader"
        >
            <SpinnerCircular/>
        </Paper>
    );
}
