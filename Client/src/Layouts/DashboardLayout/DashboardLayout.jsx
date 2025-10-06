import React, { useEffect } from "react";
import "./dashboardLayout.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { ChatList } from "../../components";
import CircularProgress from "@mui/material/CircularProgress";
const DashboardLayout = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/login");
    }
  }, [navigate, isLoaded, userId]);
  if (!isLoaded)
    return (
      <div className="loading">
        <CircularProgress color="inherit" />
      </div>
    );
  return (
    <div className="dashboardLayout">
      <div className="menu">
        <ChatList />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
