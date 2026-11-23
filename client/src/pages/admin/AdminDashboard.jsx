import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the current sub-route from the URL (defaults to "overviews")
  const currentPath = location.pathname.split("/").pop() || "overviews";

  const NAV_ITEMS = [
    { id: "overviews", label: "Executive Overview" },
    { id: "plans", label: "Membership Plans" },
    { id: "managemen", label: "Member Management" },
    { id: "payments", label: "Payments & Invoices" },
    { id: "trainer", label: "Trainer Management" },
    { id: "class", label: "Schedule Management" },
    { id: "library", label: "Workout Library" },
    { id: "attendance", label: "Attendance Management" },
    { id: "leads", label: "Leads & Enquiries" },
    { id: "content-management", label: "Content management" },
    { id: "reports", label: "Reports" },
    { id: "permissions", label: "Permissions" },
    { id: "settings", label: "Settings" },
    { id: "audit-log", label: "Audit log" },
  ];

  const handleSelectTab = (id) => {
    navigate(`/dashboard/admin/${id}`);
  };

  return (
    <DashboardLayout
      title="Admin & Operations Control"
      navItems={NAV_ITEMS}
      activeTab={currentPath}
      onSelectTab={handleSelectTab}
    >
      {/* Renders the matching child <Route> component */}
      <Outlet />
    </DashboardLayout>
  );
};

export default AdminDashboard;
