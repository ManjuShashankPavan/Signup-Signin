import React from "react";
import { logout } from "../firebase/auth";

const Dashboard = () => {
  const handleLogout = async () => {
    try {
      await logout();
      console.log("User logged out");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">Welcome to Dashboard</h2>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
