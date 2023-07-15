import { toast } from 'react-toastify';
import toastsConfig from '../toasts-config';


const alertSuccess = (text, changes={}) => {
    toast.success(text, toastsConfig(changes));
}

export default alertSuccess;