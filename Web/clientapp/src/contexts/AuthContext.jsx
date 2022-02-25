import React, { createContext, useEffect, useReducer } from "react";
import {
  isValidSession,
  removeSession,
  setSession,
  doRefreshToken,
  hasSession,
  refreshSession,
  getUserName,
  getUserType,
  getPhoto,
  getUserId,
} from "../services/JWTAuthService.jsx";
import { FullLoading } from "../ui-componets";
import { useNavigate } from 'react-router'
import CustomerStatics from "../helpers/statics/CustomerStatic.jsx";

const T_LOGIN = "LOGIN";
const T_LOGOUT = "LOGOUT";
const T_INIT = "INITIALIZE";
const T_DESTROY_INIT = "DESTROY";
const initialValue = {
  isInitialized: false,
  isAuthenticated: false,
  userType: "",
  userName: "",
  photo: "",
  userId: ""
};
const reducer = (state = initialValue, action) => {
  switch (action.type) {
    case T_INIT:
      return {
        ...state,
        isInitialized: true,
        isAuthenticated: true,
        userName: action.payload.userName,
        userType: action.payload.userType,
        userId: action.payload.userId,
        photo: action.payload.photo
      };
    case T_DESTROY_INIT:
      return {
        ...state,
        isInitialized: true,
        isAuthenticated: false,
        userName: "",
        userType: "",
        userId: "",
        photo: ""
      };
    case T_LOGIN:
      return {
        ...state,
        userName: action.payload.userName,
        userType: action.payload.userType,
        userId: action.payload.userId,
        photo: action.payload.photo,
        isInitialized: true,
        isAuthenticated: true
      };
    case T_LOGOUT:
      return {
        ...state,
        isInitialized: true,
        isAuthenticated: false,
        userName: "",
        userType: "",
        userId: "",
        photo: ""
      };
    default:
      return { ...state };
  }
};
const AuthContext = createContext({
  ...initialValue,
  login: (token, rememberMe) => { },
  logout: () => { },
  destroyAuth: () => { },
  isSunriseAdmin: () => { },
  isCustomer: () => { },
  isEmployeeAdmin: () => { },
  isEmployee:()=>{},
  isCompany:()=>{},
  getRelatedLayoutPath: () => { },
  reInit: (token) => { }
});
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);
  const navigate = useNavigate()
  const login = (token, rememberMe) => {
    setSession(token, rememberMe);
    let profilePhotoPath = ""
    const userName = getUserName()
    const userId = getUserId()
    if (isCustomer()) {
      let profilePhoto = getPhoto()
      profilePhotoPath = CustomerStatics.profilePituresPath(userId, profilePhoto)
    }

    dispatch({
      type: T_LOGIN,
      payload: {
        userName: userName,
        userType: getUserType(),
        userId: userId,
        photo: profilePhotoPath
      }
    })
  };
  const isCustomer = () => {
    return getUserType() === "Customer";
  }
  const isCompany = () => {
    return getUserType() === "Company";
  }
  const isEmployee = () => {
    return getUserType() === "Employee";
  }
  const isSunriseAdmin = () => {
    return getUserType() === "Management";
  }
  const logout = async () => {
    dispatch({
      type: T_LOGOUT
    });
    removeSession();
  };
  const destroyAuth = () => {
    dispatch({
      type: T_DESTROY_INIT
    })
  }
  const getRelatedLayoutPath = () => {
    if (isCustomer() || isEmployee()) {
      return '/customer/dashboard'
    } else if (isCompany()) {
      return '/company'
    } else if (isSunriseAdmin()) {
      return '/management'
    }
    return "/"
  }
  const reInit = (token) => {
    setSession(token, true)
    let profilePhotoPath = ""
    const userName = getUserName()
    const userId = getUserId()
    if (isCustomer()) {
      let profilePhoto = getPhoto()
      profilePhotoPath = CustomerStatics.profilePituresPath(userId, profilePhoto)
    }
    dispatch({
      type: T_INIT,
      payload: {
        userName: userName,
        userType: getUserType(),
        userId: userId,
        photo: profilePhotoPath
      }
    })
  }
  useEffect(() => {
    (async () => {
      try {
        if (hasSession()) {
          if (isValidSession()) {
            refreshSession()
          } else {
            await doRefreshToken()
          }
          let profilePhotoPath = ""
          const userName = getUserName()
          const userId = getUserId()
          if (isCustomer()) {
            let profilePhoto = getPhoto()
            profilePhotoPath = CustomerStatics.profilePituresPath(userId, profilePhoto)
          }
          dispatch({
            type: T_INIT,
            payload: {
              userName: userName,
              userType: getUserType(),
              userId: userId,
              photo: profilePhotoPath
            }
          })
        } else {
          dispatch({
            type: T_DESTROY_INIT
          });
        }
      } catch (err) {
        dispatch({
          type: T_DESTROY_INIT
        });
      }
    })();
  }, []);

  if (!state.isInitialized) {
    return <FullLoading />;
  }
  return (
    <AuthContext.Provider
      value={{
        ...state,
        logout,
        login,
        destroyAuth,
        isCustomer,
        isSunriseAdmin,
        isEmployee,
        isCompany,
        getRelatedLayoutPath,
        reInit
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
