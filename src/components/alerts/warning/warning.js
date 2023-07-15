import { toast } from 'react-toastify';
import toastsConfig from '../toasts-config';


const alertWarning = (text, changes={}) => {
    toast.warning(text, toastsConfig(changes));
}

export default alertWarning;