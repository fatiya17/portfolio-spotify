import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// layouts
import AppLayout from './layouts/AppLayout';
import AdminLayout from './layouts/AdminLayout'; 

// public pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Certificates from './pages/Certificates';
import Skills from './pages/Skills';
import Contact from './pages/Contact';

// admin pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageProjects from './pages/admin/ManageProjects';
import ManageExperience from './pages/admin/ManageExperience';
import ManageEducation from './pages/admin/ManageEducation';
import ManageCertificates from './pages/admin/ManageCertificates';
import ManageSkills from './pages/admin/ManageSkills';

// protected route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
};

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        {/* public routes */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="experience" element={<Experience />} />
          <Route path="education" element={<Education />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="skills" element={<Skills />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* admin routes */}
        <Route path="/admin/login" element={<Login />} />
        
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<ManageProjects />} />
          <Route path="experience" element={<ManageExperience />} />
          <Route path="education" element={<ManageEducation />} />
          <Route path="certificates" element={<ManageCertificates />} />
          <Route path="skills" element={<ManageSkills />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;