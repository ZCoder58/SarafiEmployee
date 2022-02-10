import { Container, Card, CardHeader, Button, IconButton, CardContent } from "@mui/material";
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import { useNavigate } from "react-router";
import React, { useReducer } from "react";
import { HomeOutlined } from "@mui/icons-material";
import SignUpFormUser from "./SignUpForm.jsx";
import ChooseYourPlan from "./ChooseYourPlan.jsx";
import UserSignupDone from "./UserSignUpDone.jsx";
import Util from "../../../helpers/Util";
import { axiosApi } from "../../../axios";
const TSetPack="SET_PACK"
const TSetSignup="SET_SIGNUP"
const initState={
    signupModel:{
        userId:"",
        name:"",
        lastName:"",
        phone:"",
        email:"",
        companyName:""
    },
    pack:"",
    isSignupDone:false,
    isPackSelected:false
}
const reducer=(state,action)=>{
    switch (action.type) {
        case TSetSignup:
            return {
                ...state,
                signupModel:action.payload,
                isSignupDone:true
            }
        case TSetPack:
            return {
                ...state,
                ...action.payload,
                isPackSelected:true
            }
    
        default:
            return {...state}
    }
}
export const SignupContext=React.createContext({
    ...initState,
    setPack:()=>{},
    CreateUser:()=>{}
})

export default function VSignup() {
    const [state,dispatch]=useReducer(reducer,initState)
    const navigate=useNavigate()
    async function setPack(packValue,packId){
        await axiosApi.post('package/SetPackage',{
            packId:packId,
            userId:state.signupModel.userId
        });

        dispatch({
            type:TSetPack,
            payload:{
                pack:packValue
            }
        })
    }
    async function CreateUser(formValues){
        var newCreatedUserId=await axiosApi.post('CustomerAuth/SignUp', Util.ObjectToFormData(formValues));
        dispatch({
            type:TSetSignup,
            payload:{
                ...formValues,
                userId:newCreatedUserId
            }
        })
    }

    return (
        <Container component="main" maxWidth="md" sx={{ 
            py:5
         }}>
            <Card>
                <CardHeader
                    title="فورم ثبت صرافی"
                    avatar={
                        <ContactPageOutlinedIcon />
                    }
                    action={
                        <IconButton onClick={() => navigate('/')}>
                            <HomeOutlined/>
                        </IconButton>
                    }
                />
                <CardContent>
                    <SignupContext.Provider value={{ 
                        ...state,
                        setPack,
                        CreateUser
                     }}>
                         {!state.isSignupDone&&<SignUpFormUser/>}
                         {(state.isSignupDone && !state.isPackSelected) &&<ChooseYourPlan/>}
                         {state.isPackSelected&&<UserSignupDone/>}
                    </SignupContext.Provider>
                </CardContent>
            </Card>
        </Container>
    )
}