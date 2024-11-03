import React, { useEffect } from "react";

import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function AdminRoutes({ children }) {
  let { user, loading } = useAuthContext();

  if (!user) {
    return <Navigate to={"/login"} />;
  }
  if (!user.isAdmin) {
    return <Navigate to={"/"} />;
  }
  return children;
}

export default AdminRoutes;
