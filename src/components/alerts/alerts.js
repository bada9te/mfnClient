/*import Swal  from 'sweetalert2'


export const SimpleAlert = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1200,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})*/

import alertError from "./error/error";
import alertSuccess from "./success/success";
import alertWarning from "./warning/warning";
import alertPromise from "./promise/promise";

export { 
    alertError, 
    alertSuccess, 
    alertWarning, 
    alertPromise 
} 