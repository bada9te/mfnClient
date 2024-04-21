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
                minHeight: '100vh',
                zIndex: loading ? 80 : 0,
            }} 
            className="loader"
        >
            <SpinnerCircular/>
        </Paper>
    );
}
