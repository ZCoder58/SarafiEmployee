import React from 'react'
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { getValidToken } from '../services/JWTAuthService';
import useToast from '../hooks/useToast'
import useNotifications  from '../hooks/useNotifications';
import {UpdateFriendsRequestCount} from '../redux/actions/CustomerLayoutActions'
import { useDispatch } from 'react-redux';
import useAuth from '../hooks/useAuth';
export default function NofifyHub({ children }) {
    const notifications=useNotifications()
    const dispatch=useDispatch()
    const auth=useAuth()
    const toast = useToast()
    React.useEffect(() => {
        const newConnection = new HubConnectionBuilder()
        .withUrl('/notify_hub', {
            accessTokenFactory: async () => await getValidToken()
        })
        .configureLogging(LogLevel.None)
        .build();
        newConnection.start().catch(e => console.log('Error while establishing connection :('))
        newConnection.on("ReceiveNotify", (message, type) => {
            toast.showToast(message, type)
        });
        newConnection.on("UpdateNotifications", () => {
            notifications.updateNotifications()
        });
        if(!auth.isSunriseAdmin()){

            dispatch(UpdateFriendsRequestCount())
        }
        newConnection.on("UpdateRequestsCount", () => {
           dispatch(UpdateFriendsRequestCount())
        });
    }, []);

    return (
        children
    )
}