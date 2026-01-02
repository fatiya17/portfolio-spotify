import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom'; 
import { Search, Library, Menu, LayoutGrid } from 'lucide-react'; 

import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar';
import Header from '../components/Header'; 
import PlayerBar from '../components/PlayerBar'; 

const ProfileFilledIcon = ({ size = 24, fill = "currentColor", className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill={fill} />
    <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill={fill} />
  </svg>
);

const AppLayout = () => {
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // mobile state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobilePlayerOpen, setIsMobilePlayerOpen] = useState(false);

  // desktop sidebar expand state
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false); 

  const handleCloseProject = () => {
    setSelectedProject(null);
    setShowRightSidebar(false);
    setIsMobilePlayerOpen(false);
    setIsSidebarExpanded(false); 
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-hidden">
      <Header />
      {/* mobile burger */}
      <div className="md:hidden fixed top-0 left-0 z-[60] p-4 pt-5">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="bg-black/50 p-2 rounded-full backdrop-blur-md text-white hover:bg-black/80 transition"
          >
            <Menu size={24} />
          </button>
      </div>
      
      {/* center content */}
      <div className="flex-1 flex gap-2 px-2 pb-2 mt-16 overflow-hidden relative">
        
        {/* sidebar left */}
        <Sidebar 
            isOpen={isMobileMenuOpen} 
            onClose={() => setIsMobileMenuOpen(false)} 
        />

        {/* main content */}
        <div 
            id="main-content" 
            className={`
                bg-[#121212] rounded-lg overflow-y-auto relative w-full group custom-scrollbar 
                ${selectedProject ? 'pb-32 md:pb-0' : 'pb-20 md:pb-0'}
                ${isSidebarExpanded ? 'hidden md:hidden' : 'flex-1'} 
            `}
        >
            <Outlet context={{ setSelectedProject, setShowRightSidebar }} /> 
        </div>

        {/* right sidebar in desktop */}
        {showRightSidebar && selectedProject && (
             <RightSidebar 
                project={selectedProject} 
                onClose={handleCloseProject}
                isMobileFull={false} 
                isExpanded={isSidebarExpanded}
                onToggleExpand={() => setIsSidebarExpanded(!isSidebarExpanded)}
             />
        )}
      </div>

      {/* player bar*/}
      {selectedProject && (
        <PlayerBar 
            project={selectedProject} 
            onOpenMobilePlayer={() => setIsMobilePlayerOpen(true)}
        />
      )}

      {/* mobile screen overlay */}
      {selectedProject && (
        <div className={`md:hidden fixed inset-0 z-[100] bg-[#121212] transition-transform duration-300 ease-in-out ${isMobilePlayerOpen ? 'translate-y-0' : 'translate-y-[100%]'}`}>
            <RightSidebar 
                project={selectedProject} 
                onClose={() => setIsMobilePlayerOpen(false)} 
                isMobileFull={true} 
            />
        </div>
      )}
      <MobileNav />
    </div>
  );
};

const MobileNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? "text-white" : "text-[#b3b3b3]";

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-black/90 border-t border-[#282828] z-50 flex justify-around items-center px-2 pb-1 backdrop-blur-lg">
        <button onClick={() => navigate('/')} className={`flex flex-col items-center gap-1 ${isActive('/')}`}>
            <ProfileFilledIcon size={24} fill="currentColor" />
            <span className="text-[10px] font-medium">Profile</span>
        </button>
        <button onClick={() => navigate('/projects')} className={`flex flex-col items-center gap-1 ${isActive('/projects')}`}>
            <LayoutGrid size={24} />
            <span className="text-[10px] font-medium">Projects</span>
        </button>
        <button onClick={() => navigate('/experience')} className={`flex flex-col items-center gap-1 ${isActive('/experience')}`}>
            <Library size={24} />
            <span className="text-[10px] font-medium">Library</span>
        </button>
    </div>
  );
};

export default AppLayout;