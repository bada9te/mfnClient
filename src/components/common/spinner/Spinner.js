import { Spinner as Sp } from "react-bootstrap";
import './spinner.scss';


const Spinner = props => {
    return (
        <div className="w-100 d-flex justify-content-center spinner" style={{ margin: '0 auto' }}>
            <Sp animation="border"/>
        </div>
    );
}

export default Spinner;