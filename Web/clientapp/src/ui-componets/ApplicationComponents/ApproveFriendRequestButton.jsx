import React from 'react'
import { LoadingButton } from '@mui/lab'
import authAxiosApi from '../../axios'
import { ButtonGroup } from '@mui/material'
ApproveFriendRequestButton.defaultProps = {
    customerId: "",
    onClick: () => { }
}
export default function ApproveFriendRequestButton({ requestId, onClick }) {
    const [acceptLoading, setAcceptLoading] = React.useState(false)
    const [denyLoading, setDenyLoading] = React.useState(false)
    async function handleAcceptClick() {
        setAcceptLoading(true)
        try{
            await authAxiosApi.get(`customer/friends/approveRequest/${requestId}`)
        }catch(error){

        }
        setAcceptLoading(false)
        onClick()
    }
    async function handleDenyClick() {
        setDenyLoading(true)
        try{
            await authAxiosApi.get(`customer/friends/denyRequest/${requestId}`)
        }catch(error){
            
        }
        setDenyLoading(false)
        onClick()
    }

    return (
        <ButtonGroup size='small'>
           {!denyLoading&&<LoadingButton
                loading={acceptLoading}
                variant='contained'
                color='primary'
                size="small"
                type='button'
                onClick={handleAcceptClick}
            >
                قبول کردن
            </LoadingButton>}
           {!acceptLoading && <LoadingButton
                loading={denyLoading}
                variant='outlined'
                color='primary'
                size="small"
                type='button'
                onClick={handleDenyClick}
            >
                رد کردن
            </LoadingButton>}
        </ButtonGroup>
    )
}
