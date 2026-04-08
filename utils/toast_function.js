import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function toaster(type, msg, position = "top-left") {
    toast(msg, {
        position,
        style: {
            borderRadius: "100px"
        },
        bodyStyle: {
            fontFamily: 'Futura LT Pro',
            fontSize: "14px",
            fontWeight: "500",
            color: "black"
        },
        closeButton: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        type,
        progress: undefined,
        theme: "light",
        transition: Slide
    })
}