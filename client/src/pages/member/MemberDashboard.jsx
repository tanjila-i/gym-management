import React from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const MemberDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the current sub-route from the URL (defaults to "overviews")
  const currentPath = location.pathname.split("/").pop() || "overviews";

  const NAV_ITEMS = [
    { id: "class", label: "Classes" },
    { id: "plans", label: "Membership Plans" },
  ];

  // // Safely extracts the last segment, defaulting to 'overviews' if at the base route
  // const pathSegments = location.pathname.split("/").filter(Boolean);
  // const lastSegment = pathSegments[pathSegments.length - 1];
  // const currentPath =
  //   lastSegment === "member" || !lastSegment ? "overviews" : lastSegment;

  const handleSelectTab = (id) => {
    navigate(`/dashboard/member/${id}`);
  };

  return (
    <DashboardLayout
      activeTab={currentPath}
      onSelectTab={handleSelectTab}
      title="Member Portal"
      navItems={NAV_ITEMS}
    >
      {/* Renders the matching child <Route> component */}
      <Outlet />
    </DashboardLayout>
  );
};

export default MemberDashboard;
