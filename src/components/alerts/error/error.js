import { toast } from 'react-toastify';
import toastsConfig from '../toasts-config';


const alertError = (text, changes={}) => {
    toast.error(text, toastsConfig(changes));
}

export default alertError;