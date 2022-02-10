import React from 'react'
import authAxiosApi from '../axios'
const UpdateNotifications = "UPDATE_NOTIFICS"
const SeenNotifications = "SEEN_NOTIFICS"
const initialValue = {
    notifications: [],
    notificationCount: 0,
    unSeensCount: 0,
    loading: true
}
const reducer = (state = initialValue, action) => {
    switch (action.type) {
        case UpdateNotifications:
            return {
                ...state,
                notifications: action.payload.notifications,
                notificationCount: action.payload.count,
                unSeensCount:action.payload.unSeensCount,
                loading: false
            };
            case SeenNotifications:
            return {
                ...state,
                unSeensCount:0
            };

        default:
            return { ...state };
    }
}

export const NotificationProvider = ({ children, serverUrl,seenUrl }) => {
    const [state, dispatch] = React.useReducer(reducer, initialValue)
    async function updateNotifications() {
        await authAxiosApi.get(serverUrl).then(r => {
            dispatch({
                type: UpdateNotifications,
                payload: {
                    notifications: r.notifications,
                    count: r.notifications.length,
                    unSeensCount:r.unseenCount
                }
            })
        })
    }
    async function seenNotifications() {
        await authAxiosApi.get(seenUrl).then(r => {
            dispatch({
                type: SeenNotifications,
            })
        })
    }
    React.useEffect(() => {
        (async () => {
            await authAxiosApi.get(serverUrl).then(r => {
                dispatch({
                    type: UpdateNotifications,
                    payload: {
                        notifications: r.notifications,
                        count: r.notifications.length,
                        unSeensCount:r.unseenCount
                    }
                })
            })
        })()
    }, [serverUrl])
    return (
        <NotificationContext.Provider value={{
            ...state,
            updateNotifications,
            seenNotifications
        }}>
            {children}
        </NotificationContext.Provider>
    )
}
const NotificationContext = React.createContext({
    ...initialValue,
    updateNotifications: () => { },
    seenNotifications:()=>{}
})
export default NotificationContext