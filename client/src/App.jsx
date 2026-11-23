import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/public/HomePage";
import RegiserPage from "./pages/public/RegiserPage";
import LoginPage from "./pages/public/LoginPage";
import MemberDashboard from "./pages/member/MemberDashboard";
import TrainerDashboard from "./pages/trainer/TrainerDashboard";
import ReceptionWorkspace from "./pages/reception/ReceptionWorkspace";
import AdminDashboard from "./pages/admin/AdminDashboard";
import VerifyEmail from "./components/VerifyEmail";
import PasswordReset from "./components/PasswordReset";
import AboutPage from "./pages/public/AboutPage";
import PublicLayout from "./layout/PublicLayout";
import GalleryPage from "./pages/public/GalleryPage";
import ContactUsPage from "./pages/public/ContactUsPage";
import ClassesPage from "./pages/public/ClassesPage";
import Booking from "./components/Booking";
import OverviewPage from "./pages/admin/DashboardPages/MemberOverviewPage";
import PlanPage from "./pages/admin/DashboardPages/PlanPage";
import ManagemenPage from "./pages/admin/DashboardPages/ManagemenPage";
import PaymentsPage from "./pages/admin/DashboardPages/PaymentsPage";
import TrainerPage from "./pages/admin/DashboardPages/TrainerPage";
import ClassPage from "./pages/admin/DashboardPages/ClassPage";
import LibraryPage from "./pages/admin/DashboardPages/LibraryPage";
import AttendancePage from "./pages/admin/DashboardPages/AttendancePage";
import LeadsPage from "./pages/admin/DashboardPages/LeadsPage";
import OverviewMemberPage from "./pages/member/DashboardPages/OverviewMemberPage";
import Membership from "./pages/member/DashboardPages/Membership";
import ClassBookingPage from "./pages/member/DashboardPages/ClassBookingPage";
import NotificationsPage from "./pages/member/DashboardPages/NotificationsPage";
import MemberPaymentsPage from "./pages/member/DashboardPages/MemberPaymentsPage";
import ProfilePage from "./pages/member/DashboardPages/ProfilePage";
import WorkoutPage from "./pages/member/DashboardPages/WorkoutPage";
import ProgressPage from "./pages/member/DashboardPages/ProgressPage";
import SupportPage from "./pages/member/DashboardPages/SupportPage";
import ContentManagementPage from "./pages/admin/DashboardPages/ContentManagementPage";
import ReportsPage from "./pages/admin/DashboardPages/ReportsPage";
import PermissionsPage from "./pages/admin/DashboardPages/PermissionsPage";
import SettingsPage from "./pages/admin/DashboardPages/SettingsPage";
import AuditLogPage from "./pages/admin/DashboardPages/AuditLogPage";
import TrainerOverviews from "./pages/trainer/DashboardPages/TrainerOverviews";
import ListProfilePage from "./pages/trainer/DashboardPages/ListProfilePage";
import SchedulePage from "./pages/trainer/DashboardPages/SchedulePage";
import NotesPage from "./pages/trainer/DashboardPages/NotesPage";
import TemplatesPage from "./pages/trainer/DashboardPages/TemplatesPage";
import UpdatesClass from "./pages/trainer/DashboardPages/UpdatesClass";
import ApprovedPaymentPage from "./pages/reception/DashbooardPages/ApprovedPaymentPage";

import ContactMembersPage from "./pages/reception/DashbooardPages/ContactMembersPage";
import NewMemberPage from "./pages/reception/DashbooardPages/NewMemberPage";
import MemberShipValidPage from "./pages/reception/DashbooardPages/MemberShipValidPage";
import AttendanceCheckPage from "./pages/reception/DashbooardPages/AttendanceCheckPage";
import PostMemberShipPage from "./pages/public/PostMemberShipPage";

const App = () => {
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Booking
          isOpen={trialModalOpen}
          onClose={() => setTrialModalOpen(false)}
        />
        <Routes>
          <Route
            element={
              <PublicLayout onOpenTrial={() => setTrialModalOpen(true)} />
            }
          >
            <Route
              path="/"
              element={<HomePage onOpenTrial={() => setTrialModalOpen(true)} />}
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            {/* <Route path="/contact-us" element={<ContactUsPage />} /> */}
            <Route path="/post-memberShip" element={<PostMemberShipPage />} />
            <Route path="/classes" element={<ClassesPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>{" "}
          <Route path="/register" element={<RegiserPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          {/* Admin Dashboard pages */}
          <Route path="/dashboard/admin" element={<AdminDashboard />}>
            <Route index element={<Navigate to="overviews" replace />} />
            <Route path="overviews" element={<OverviewPage />} />

            <Route index element={<Navigate to="plans" replace />} />
            <Route path="plans" element={<PlanPage />} />

            <Route index element={<Navigate to="managemen" replace />} />
            <Route path="managemen" element={<ManagemenPage />} />
            <Route index element={<Navigate to="payments" replace />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route index element={<Navigate to="trainer" replace />} />
            <Route path="trainer" element={<TrainerPage />} />
            <Route index element={<Navigate to="class" replace />} />
            <Route path="class" element={<ClassPage />} />
            <Route index element={<Navigate to="library" replace />} />
            <Route path="library" element={<LibraryPage />} />
            <Route index element={<Navigate to="attendance" replace />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route index element={<Navigate to="leads" replace />} />
            <Route path="leads" element={<LeadsPage />} />
            <Route
              index
              element={<Navigate to="content-management" replace />}
            />
            <Route
              path="content-management"
              element={<ContentManagementPage />}
            />
            <Route index element={<Navigate to="reports" replace />} />
            <Route path="reports" element={<ReportsPage />} />

            <Route index element={<Navigate to="permissions" replace />} />
            <Route path="permissions" element={<PermissionsPage />} />
            <Route index element={<Navigate to="settings" replace />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route index element={<Navigate to="audit-log" replace />} />
            <Route path="audit-log" element={<AuditLogPage />} />
            {/* Admin Deshboard pages endes here */}

            {/* Member Deshboard pages */}
          </Route>{" "}
          <Route path="/dashboard/member" element={<MemberDashboard />}>
            <Route index element={<Navigate to="overviews" replace />} />
            <Route path="overviews" element={<OverviewMemberPage />} />
            <Route index element={<Navigate to="plans" replace />} />
            <Route path="plans" element={<Membership />} />
            <Route index element={<Navigate to="class" replace />} />
            <Route path="class" element={<ClassBookingPage />} />
            <Route index element={<Navigate to="notifications" replace />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route index element={<Navigate to="payments" replace />} />
            <Route path="payments" element={<MemberPaymentsPage />} />
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route index element={<Navigate to="workout" replace />} />
            <Route path="workout" element={<WorkoutPage />} />
            <Route index element={<Navigate to="progress" replace />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route index element={<Navigate to="supports" replace />} />
            <Route path="supports" element={<SupportPage />} />
          </Route>
          {/* Trainer Deshboard pages Start here*/}{" "}
          <Route path="/dashboard/trainer" element={<TrainerDashboard />}>
            <Route
              index
              element={<Navigate to="trainer-overviews" replace />}
            />
            <Route path="trainer-overviews" element={<TrainerOverviews />} />
            <Route index element={<Navigate to="list-profile" replace />} />
            <Route path="list-profile" element={<ListProfilePage />} />
            <Route index element={<Navigate to="schedule" replace />} />
            <Route path="schedule" element={<SchedulePage />} />

            <Route index element={<Navigate to="notes" replace />} />
            <Route path="notes" element={<NotesPage />} />
            <Route index element={<Navigate to="templates" replace />} />
            <Route path="templates" element={<TemplatesPage />} />
            <Route index element={<Navigate to="updates-class" replace />} />
            <Route path="updates-class" element={<UpdatesClass />} />
          </Route>{" "}
          {/* Trainer Deshboard pages ends here*/}
          {/* Reception Deshboard pages Start here*/}{" "}
          <Route path="/dashboard/reception" element={<ReceptionWorkspace />}>
            <Route index element={<Navigate to="approved-payment" replace />} />
            <Route path="approved-payment" element={<ApprovedPaymentPage />} />

            <Route index element={<Navigate to="attendance-check" replace />} />
            <Route path="attendance-check" element={<AttendanceCheckPage />} />

            <Route index element={<Navigate to="contact-members" replace />} />
            <Route path="contact-members" element={<ContactMembersPage />} />

            <Route index element={<Navigate to="memberShip-valid" replace />} />
            <Route path="memberShip-valid" element={<MemberShipValidPage />} />

            <Route index element={<Navigate to="new-member" replace />} />
            <Route path="new-member" element={<NewMemberPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
