import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Projects",
      path: "/admin/projects",
      icon: <FolderKanban size={20} />,
    },
    {
      name: "Experience",
      path: "/admin/experience",
      icon: <Briefcase size={20} />,
    },
    {
      name: "Education",
      path: "/admin/education",
      icon: <GraduationCap size={20} />,
    },
    {
      name: "Certificates",
      path: "/admin/certificates",
      icon: <Award size={20} />,
    },
    { name: "Skills", path: "/admin/skills", icon: <Layers size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      {/* mobile overlay (only visible when sidebar is open on small screens) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* admin sidebar (drawer) */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#121212] border-r border-[#333] flex flex-col
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0
      `}
      >
        <div className="p-6 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold tracking-tighter text-white">
              Spotify CMS
            </h1>
            <p className="text-xs text-gray-500">Content Management</p>
          </div>
          {/* close button for mobile */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)} // auto close on mobile click
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200
                 ${
                   isActive
                     ? "bg-[#282828] text-white shadow-md border-l-4 border-green-500"
                     : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
                 }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-[#333]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium text-red-400 hover:bg-[#1a1a1a] rounded transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* content area */}
      <div className="flex-1 flex flex-col h-full relative w-full">
        {/* mobile header toggle */}
        <div className="md:hidden p-4 border-b border-[#333] flex items-center gap-3 bg-[#121212] sticky top-0 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-white hover:bg-[#2a2a2a] p-2 rounded transition"
          >
            <Menu size={24} />
          </button>
          <span className="font-bold text-lg">Admin Panel</span>
        </div>

        {/* main outlet scrollable */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#121212] p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
