import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";

const ReceptionWorkspace = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the current sub-route from the URL (defaults to "overviews")
  const currentPath = location.pathname.split("/").pop() || "overviews";
  const NAV_ITEMS = [
    { id: "approved-payment", label: "Approved Payment" },
    { id: "attendance-check", label: "Attendance Check" },
    { id: "contact-members", label: "Contact Members" },
    { id: "memberShip-valid", label: "MemberShip Valid" },
    { id: "new-member", label: "New Member" },
  ];

  const handleSelectTab = (id) => {
    navigate(`/dashboard/reception/${id}`);
  };
  return (
    <DashboardLayout
      activeTab={currentPath}
      onSelectTab={handleSelectTab}
      title="Reception & Front Desk"
      navItems={NAV_ITEMS}
    >
      {/* Renders the matching child <Route> component */}
      <Outlet />
    </DashboardLayout>
  );
};

export default ReceptionWorkspace;
