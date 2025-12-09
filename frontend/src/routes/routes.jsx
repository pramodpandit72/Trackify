import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import Trainers from "../pages/public/Trainers";
import TrainerDetail from "../pages/public/TrainerDetail";
import Exercise from "../pages/public/Exercise";

import Jobs from "../pages/jobs/Jobs";          // ✅ Correct import
import ApplyJobs from "../pages/jobs/ApplyJobs"; // ✅ Correct import

import Reviews from "../pages/public/Reviews";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import FAQ from "../pages/public/Faq";
import Login from "../pages/public/login";
import SignUp from "../pages/public/signup";
import KnowUs from "../components/public/KnowUs";

// Auth pages
import UserDashboard from "../pages/auth/UserDashboard";
import AdminDashboard from "../pages/auth/AdminDashboard";
import UpdateProfile from "../pages/auth/UpdateProfile";

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
        <Route path="/jobs" element={<Jobs />} />                 {/* ✅ Correct */}
        <Route path="/jobs/:jobId/apply" element={<ApplyJobs />} /> {/* ✅ Correct */}

        <Route path="/reviews" element={<Reviews />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/knowus" element={<KnowUs />} />

        {/* auth pages - protected routes */}
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/profile/edit" element={<UpdateProfile />} />
      </Routes>
    </>
  );
}

export default RoutesClient;
