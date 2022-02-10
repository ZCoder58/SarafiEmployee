import React from "react";
import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth.jsx";
const AuthGuard = props => {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) {
    return <>{props.children}</>;
  } else {
    return <Navigate to="/" />;
  }
};
export default AuthGuard
