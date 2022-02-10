import jwtDecode from "jwt-decode";
import authAxiosApi, { axiosWithBearer } from "../axios";
const appTokenName="97F8A163E3E34B52B89BDB71035078EBT";
const appRefreshTokenName="83715D345BEE4AB0806F6EFD6994FA3ER"
export const doRefreshToken =async () => {
  const lastAccessToken = getToken();
    var newAuthResult= await axiosWithBearer.post("/api/Auth/refreshToken",{
      Token:lastAccessToken
    });
    setSession(newAuthResult.token,true)
};
export const getUserId=()=>{
  const token=getToken()
  if (!token) {
    return "";
  }
  const decodedToken = jwtDecode(token);
  return decodedToken.userId;
}
export const getUserName=()=>{
  const token=getToken()
  if (!token) {
    return "";
  }
  const decodedToken = jwtDecode(token);
  return decodedToken.userName;
}
export const getPhoto=()=>{
  const token=getToken()
  if (!token) {
    return "";
  }
  const decodedToken = jwtDecode(token);
  return decodedToken.photo;
}
export const getUserType=()=>{
  const token=getToken()
  if (!token) {
    return "";
  }
  const decodedToken = jwtDecode(token);
  return decodedToken.userType;
}
export const getName=()=>{
  const token=getToken()
  if (!token) {
    return "";
  }
  const decodedToken = jwtDecode(token);
  return decodedToken.name;
}
export const getAccountType=()=>{
  const token=getToken()
  if (!token) {
    return "";
  }
  const decodedToken = jwtDecode(token);
  const type= decodedToken.isPremiumAccount==="true"?"رایگان":"طلایی";
  return type
}
export const getLastName=()=>{
  const token=getToken()
  if (!token) {
    return "";
  }
  const decodedToken = jwtDecode(token);
  return decodedToken.lastName;
}
export const isValidSession = () => {
  const token=getToken()
  if (!token) {
    return false;
  }
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};
export const refreshSession=()=>{
    var accessToken=getToken()
  authAxiosApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}
export const setSession = (accessToken,persists) => {
  if (accessToken) {
    if(persists){
      localStorage.setItem(appTokenName,accessToken)
    }else{
      sessionStorage.setItem(appTokenName,accessToken)
    }
    // localStorage.setItem(appRefreshTokenName,refreshToken)
    authAxiosApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    removeSession()
  }
};
export const getToken=()=> {
  let token=localStorage.getItem(appTokenName)
  if(token){
    return token
  }
  return sessionStorage.getItem(appTokenName)
}
export const getValidToken=async()=>{
  if(!isValidSession()){
   await doRefreshToken()
  }
  return getToken();
}
export const getRefresh=()=> localStorage.getItem(appRefreshTokenName)

export const removeSession=()=>{
  localStorage.removeItem(appTokenName)
  sessionStorage.removeItem(appTokenName)
  // localStorage.removeItem(appRefreshTokenName)
  delete authAxiosApi.defaults.headers.common.Authorization;
}
export const hasSession=()=>{
  var accessToken=getToken()
  // var refresh =getRefresh();
  if(accessToken){
    return true;
  }
  return  false;
}