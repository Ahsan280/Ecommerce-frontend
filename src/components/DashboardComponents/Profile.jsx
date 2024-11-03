import React from "react";
import { useAuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuthContext();
  return (
    <div className="flex flex-col gap-5 text-white bg-purple-500  rounded-md p-5">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>Welcome, {user?.fullName}!</p>
      <p>Email: {user?.email}</p>
      <p>Phone: {user?.phoneNumber}</p>
    </div>
  );
};

export default Profile;
