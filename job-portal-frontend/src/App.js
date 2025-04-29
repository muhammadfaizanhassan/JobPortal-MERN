import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import JobDetails from "./pages/JobDetails";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import CompanyList from "./pages/CompanyList";
import CompanyDetails from "./pages/CompanyDetails";
import Register from "./pages/Register";
import CreateJob from "./pages/CreateJob";
import Job from "./pages/Job";
import UnauthorizedPage from "./pages/UnauthorizedPage";
// 🛡️ Import Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCompanies from "./pages/admin/AdminCompanies";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminApplications from "./pages/admin/AdminApplications";

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/job" element={<Job />} />
        <Route path="/companies" element={<CompanyList />} />
        <Route path="/company/:id" element={<CompanyDetails />} />

        {/* Recruiters Only */}
        <Route
          path="/create-job"
          element={
            <ProtectedRoute allowed="recruiter">
              <CreateJob />
            </ProtectedRoute>
          }
        />

        {/* Jobseekers or Recruiters */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowed={["jobseeker", "recruiter"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowed="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowed="admin">
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/companies"
          element={
            <ProtectedRoute allowed="admin">
              <AdminCompanies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute allowed="admin">
              <AdminJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/applications"
          element={
            <ProtectedRoute allowed="admin">
              <AdminApplications />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

      </Routes>
    </AuthProvider>
  );
};

export default App;
