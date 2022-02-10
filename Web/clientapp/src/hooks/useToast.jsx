import ToastContext from "../contexts/ToastContext.jsx";
import {useContext} from 'react'
const useToast=()=>useContext(ToastContext)
export default  useToast