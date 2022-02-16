import React from 'react'
import { LoadingButton } from '@mui/lab'
import authAxiosApi from '../../axios'
import { ButtonGroup } from '@mui/material'
import { useNavigate } from 'react-router'
FriendRequestButton.defaultProps={
    defaultState:"",
    customerId:"",
    onClick:()=>{},
    enableGotoProfile:false,
    reverseState:false
}
const states={
    approved:1,
    pending:0,
    notSend:-1,
    received:2
}
export default function FriendRequestButton({ defaultState,customerId,reverseState,onClick,enableGotoProfile,...props }) {
    const [buttonText, setButtonText] = React.useState("")
    const [state, setState] = React.useState(defaultState)
    const [sCustomerId, setSCustomerId] = React.useState(customerId)    
    const [loading, setLoading] = React.useState(false)
    const [acceptLoading, setAcceptLoading] = React.useState(false)
    const [denyLoading, setDenyLoading] = React.useState(false)
    const navigate=useNavigate()

    async function handleClick() {
        setLoading(true)
        if (state === states.approved && enableGotoProfile) {//pending
            navigate(`/customer/profile/${sCustomerId}`)
        } 
         if (state === states.pending) {//pending
            await authAxiosApi.get(`customer/friends/cancelRequest/${sCustomerId}`).then(r => {
                setState(r.state)
            })
        } else if (state === states.notSend) {//notSend
            await authAxiosApi.get(`customer/friends/sendRequest/${sCustomerId}`).then(r => {
                setState(r.state)
            })
        } else {
            console.log("invalid state");
        }
        setLoading(false)
        onClick()
    }
    async function handleAcceptClick() {
        setAcceptLoading(true)
        try{
            await authAxiosApi.get(`customer/friends/approveRequest/${sCustomerId}`).then(r=>{
                setState(r.state)
            })
        }catch(error){

        }
        setAcceptLoading(false)
        onClick()
    }
    async function handleDenyClick() {
        setDenyLoading(true)
        try{
            await authAxiosApi.get(`customer/friends/denyRequest/${sCustomerId}`).then(r=>{
                setState(r)
            })
        }catch(error){
            
        }
        setDenyLoading(false)
        onClick()
    }
    React.useEffect(()=>{
        if(reverseState){
            if(state===states.pending){
                setState(states.received)
            }
        }
    },[reverseState])
    React.useEffect(() => {
        if (state === states.approved) {//approved
            setButtonText("پروفایل")
        } else if (state === states.pending) {//pending
            setButtonText("لغو درخواست")
        } else if (state === states.notSend) {//notSend
            setButtonText("درخواست همکاری")
        }
    }, [state])
    return (
       state!==2? ((enableGotoProfile|| state!==states.approved) &&<LoadingButton
       {...props}
            loading={loading}
            variant='contained'
            color='primary'
            size="small"
            type='button'
            onClick={handleClick}
            
        >
            {buttonText}
        </LoadingButton>):
         <ButtonGroup size='small'>
         {!denyLoading&&<LoadingButton
          {...props}
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
          {...props}
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
