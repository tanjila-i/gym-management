import React from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const TrainerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the current sub-route from the URL (defaults to "overviews")
  const currentPath = location.pathname.split("/").pop() || "overviews";
  const NAV_ITEMS = [
    { id: "list-profile", label: "List Profile" },
    { id: "schedule", label: "Schedule" },
    { id: "notes", label: "Notes" },
  ];

  const handleSelectTab = (id) => {
    navigate(`/dashboard/trainer/${id}`);
  };

  return (
    <DashboardLayout
      title="Trainer Workspace"
      navItems={NAV_ITEMS}
      activeTab={currentPath}
      onSelectTab={handleSelectTab}
    >
      {/* Renders the matching child <Route> component */}
      <Outlet />
    </DashboardLayout>
  );
};

export default TrainerDashboard;
