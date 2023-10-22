import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedLogin() {
  return (
    <div>
      {localStorage.getItem("token") ? <Navigate to={"/"} /> : <Outlet />}
    </div>
  );
}

export default ProtectedLogin;