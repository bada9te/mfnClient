import { toast } from 'react-toastify';
import toastsConfig from '../toasts-config';


const alertPromise = async(pendingMsg="Operation is pending...", successMsg="Operation succeeded", errorMsg="Operation failed", functionThatReturnsPromise, changes={}) => {
    toast.promise(
        functionThatReturnsPromise, 
        {
            pending: pendingMsg,
            success: successMsg,
            error: errorMsg,
        },
        toastsConfig(changes),
    );
}

export default alertPromise;