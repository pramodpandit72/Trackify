import React from "react";
import { Routes, Route } from "react-router-dom";

// import Home from "../pages/public/Home";
import Trainers from "../pages/public/Trainers";
import TrainerDetail from "../pages/public/TrainerDetail";
// import Exercise from "../pages/public/Exercise";

import Jobs from "../pages/jobs/Jobs";
import JobDetails from "../pages/jobs/JobDetails";
import ApplyJobs from "../pages/jobs/ApplyJobs";

import Reviews from "../pages/public/Reviews";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import FAQ from "../pages/public/Faq";
import Login from "../pages/public/Login";
import SignUp from "../pages/public/Signup";
import ForgotPassword from "../pages/public/ForgotPassword";
import ResetPassword from "../pages/public/ResetPassword";
import KnowUs from "../components/public/KnowUs";
import Terms from "../pages/public/Terms";
import Policy from "../pages/public/Policy";

// Auth pages
import UserDashboard from "../pages/auth/UserDashboard";
import AdminDashboard from "../pages/auth/AdminDashboard";
import AdminApplications from "../pages/auth/AdminApplications";
import AdminLogin from "../pages/auth/AdminLogin";
import UpdateProfile from "../pages/auth/UpdateProfile";
import Home from "../pages/public/home";
import Exercise from "../pages/public/exercise";

function RoutesClient() {
  return (
    <>
      <Routes>
        {/* public */}
        <Route path="/" element={<Home />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/trainers/:trainerId" element={<TrainerDetail />} />
        <Route path="/exercise" element={<Exercise />} />

        {/* jobs pages */}
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:jobId" element={<JobDetails />} />
        <Route path="/jobs/:jobId/apply" element={<ApplyJobs />} />

        <Route path="/reviews" element={<Reviews />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/knowus" element={<KnowUs />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/policy" element={<Policy />} />

        {/* auth pages - protected routes */}
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/applications" element={<AdminApplications />} />
        <Route path="/profile/edit" element={<UpdateProfile />} />
      </Routes>
    </>
  );
}

export default RoutesClient;
