import React from "react";
import { useAuthContext } from "../context/AuthContext";
import Sidebar from "../components/DashboardComponents/SideBar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuthContext();
  return (
    <div className="">
      <Sidebar user={user} />
      <div className="pt-20 ml-auto pr-10 md:w-2/3">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
