import React from 'react'
import NotificationContext from '../contexts/NotificationContext'

const useNotifications=()=>React.useContext(NotificationContext)
export default useNotifications