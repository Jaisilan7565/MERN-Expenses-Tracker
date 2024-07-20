import { getUserFromStorage } from "../../utils/getUserFromStorage";
import { Navigate } from "react-router-dom";

import React from "react";

const AuthRoute = ({ children }) => {
  const token = getUserFromStorage();
  if (token) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AuthRoute;
