import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Home from './pages/Home';
import Projects from './pages/Projects';

import Experience from './pages/Experience';
import Education from './pages/Education';
import Certificates from './pages/Certificates';
import Skills from './pages/Skills';
import Contact from './pages/Contact';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="experience" element={<Experience />} />
        <Route path="education" element={<Education />} />
        <Route path="certificates" element={<Certificates />} />
        <Route path="skills" element={<Skills />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;