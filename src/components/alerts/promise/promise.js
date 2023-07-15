import { toast } from 'react-toastify';
import toastsConfig from '../toasts-config';


const alertPromise = async(changes={}, pendingMsg="Operation is pending...", successMsg="Operation succeeded", errorMsg="Operation failed", functionThatReturnsPromise) => {
    toast.promise(functionThatReturnsPromise, {
        pending: pendingMsg,
        success: successMsg,
        error: errorMsg,
        ...toastsConfig(changes),
    });
}

export default alertPromise;