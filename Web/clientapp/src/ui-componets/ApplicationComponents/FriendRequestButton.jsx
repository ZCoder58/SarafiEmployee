import React from 'react'
import { LoadingButton } from '@mui/lab'
import authAxiosApi from '../../axios'
FriendRequestButton.defaultProps={
    defaultState:"",
    defaultRequestId:"",
    customerId:"",
    onClick:()=>{}
}
export default function FriendRequestButton({ defaultState, defaultRequestId, customerId,onClick }) {
    const [buttonText, setButtonText] = React.useState("")
    const [state, setState] = React.useState(defaultState)
    const [requestId, setRequestId] = React.useState(defaultRequestId)
    const [loading, setLoading] = React.useState(false)
    async function handleClick() {
        setLoading(true)
        if (state === 1) {//approved
            await authAxiosApi.get(`customer/friends/deleteRequest/${requestId}`).then(r => {
                setState(r.state)
                setRequestId(r.requestId)
            })
        } else if (state === 0) {//pending
            await authAxiosApi.get(`customer/friends/cancelRequest/${requestId}`).then(r => {
                setState(r.state)
                setRequestId(r.requestId)
            })
        } else if (state === -1) {//notSend
            await authAxiosApi.get(`customer/friends/sendRequest/${customerId}`).then(r => {
                setState(r.state)
                setRequestId(r.requestId)
            })
        } else {
            console.log("invalid state");
        }
        setLoading(false)
        onClick()
    }
    React.useEffect(() => {
        if (state === 1) {//approved
            setButtonText("لغو همکاری")
        } else if (state === 0) {//pending
            setButtonText("لغو درخواست")
        } else if (state === -1) {//notSend
            setButtonText("درخواست همکاری")
        }
    }, [state])
    return (
        <LoadingButton
            loading={loading}
            variant='contained'
            color='primary'
            size="small"
            type='button'
            onClick={handleClick}
        >
            {buttonText}
        </LoadingButton>
    )
}
