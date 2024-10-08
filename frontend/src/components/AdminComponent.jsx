import React, {useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

export default function AdminRoute({children}) {
    const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      setUserRoles(decodedToken.roles);
    }
  }, []);

  const isAdmin = userRoles.includes('Admin');
  const isSuperAdmin = userRoles.includes('SuperAdmin');

  if (userRoles.length === 0) {
    return null;
  }

  if (!isAdmin && !isSuperAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}