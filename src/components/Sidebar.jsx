import React, { useState, useEffect, useRef } from 'react';
import { 
  Library, Plus, ArrowLeft, Search, Pin, 
  Briefcase, GraduationCap, Award, Heart, Code, X, Mail
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const MIN_WIDTH = 72;    
  const SNAP_THRESHOLD = 200; 
  const MAX_WIDTH = 420;   

  const [width, setWidth] = useState(280); 
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const isCollapsed = width === MIN_WIDTH;

  const startResizing = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const stopResizing = () => setIsResizing(false);

  const resize = (e) => {
    if (isResizing) {
      const mouseX = e.clientX;
      if (mouseX < SNAP_THRESHOLD) {
        setWidth(MIN_WIDTH);
      } else {
        const newWidth = Math.min(mouseX, MAX_WIDTH);
        setWidth(newWidth);
      }
    }
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResizing);
    }
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing]);

  const LIBRARY_ITEMS = [
    {
      id: 'liked',
      title: 'Liked Projects',
      subtitle: 'Pinned • 12 projects',
      icon: <Heart size={20} className="text-white fill-current" />,
      bg: 'bg-gradient-to-br from-[#450af5] to-[#c4efd9]',
      path: '/projects', 
      pinned: true
    },
    {
      id: 'exp',
      title: 'Work Experience',
      subtitle: 'Career History',
      icon: <Briefcase size={20} className="text-green-400" />,
      bg: 'bg-[#2a2a2a]',
      path: '/experience'
    },
    {
      id: 'edu',
      title: 'Education',
      subtitle: 'Academic Background',
      icon: <GraduationCap size={20} className="text-blue-400" />,
      bg: 'bg-[#2a2a2a]',
      path: '/education'
    },
    {
      id: 'cert',
      title: 'Certificates',
      subtitle: '4 Credentials',
      icon: <Award size={20} className="text-yellow-500" />,
      bg: 'bg-[#2a2a2a]',
      path: '/certificates'
    },
    {
      id: 'tech',
      title: 'Tech Stack',
      subtitle: 'Skills & Tools',
      icon: <Code size={20} className="text-pink-400" />,
      bg: 'bg-[#2a2a2a]',
      path: '/skills'
    },
    {
      id: 'contact',
      title: 'Contact Me',
      subtitle: 'Let\'s Connect', 
      icon: <Mail size={20} className="text-white" />,
      bg: 'bg-gradient-to-br from-pink-500 to-rose-500', 
      path: '/contact' 
    }
  ];

  return (
    <>
      {/* mobile overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* sidebar container */}
      <div 
        ref={sidebarRef}
        className={`
            bg-[#121212] h-full flex flex-col rounded-lg group
            fixed top-0 left-0 bottom-0 z-[70] w-[85%] max-w-[300px] transition-transform duration-300 ease-out
            md:static md:translate-x-0 md:flex
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ width: window.innerWidth >= 768 ? `${width}px` : undefined }}
      >
        
        <div className="p-2 flex flex-col h-full overflow-hidden relative">
          
          {/* header */}
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-4 py-3 text-[#b3b3b3] mb-2 shadow-sm shrink-0`}>
             <button 
                onClick={() => isCollapsed && setWidth(280)}
                className="flex items-center gap-3 hover:text-white cursor-pointer transition group" 
                title={isCollapsed ? "Expand Library" : "Your Library"}
             >
               <Library size={26} className={`shrink-0 ${isCollapsed ? 'mx-auto' : ''}`} />
               {!isCollapsed && <span className="font-bold font-sans truncate text-base group-hover:text-white transition">Your Library</span>}
             </button>
             
             {!isCollapsed && (
               <div className="flex gap-2 items-center">
                 <button className="hover:text-white hover:bg-[#2a2a2a] rounded-full p-1 transition"><Plus size={20} /></button>
                 <button 
                    onClick={() => setWidth(MIN_WIDTH)}
                    className="hover:text-white hover:bg-[#2a2a2a] rounded-full p-1 transition hidden md:block"
                    title="Collapse Sidebar"
                 >
                    <ArrowLeft size={20} />
                 </button>
                 <button onClick={onClose} className="md:hidden hover:text-white hover:bg-[#2a2a2a] rounded-full p-1 transition"><X size={20}/></button>
               </div>
             )}
          </div>

          {/* filter chips */}
          {!isCollapsed && (
            <div className="flex gap-2 px-2 mb-4 overflow-x-auto no-scrollbar fade-in shrink-0">
               {['Projects', 'Experience', 'Certificates'].map((chip) => (
                  <button 
                      key={chip}
                      onClick={() => navigate(`/${chip.toLowerCase()}`)}
                      className="bg-[#232323] px-3 py-1.5 rounded-full text-xs md:text-sm text-white font-medium hover:bg-[#303030] whitespace-nowrap transition"
                  >
                      {chip}
                  </button>
               ))}
            </div>
          )}

          {/* search bar */}
          {!isCollapsed && (
              <div className="px-4 flex justify-between items-center text-[#b3b3b3] mb-2 shrink-0">
                  <button className="hover:text-white p-1 -ml-1"><Search size={16}/></button>
                  <button className="text-xs font-semibold hover:text-white flex items-center gap-1">Recents <span className="text-[10px]">▼</span></button>
              </div>
          )}

          {/* list content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar px-2 pb-12">
             {LIBRARY_ITEMS.map((item) => (
                 <NavLink 
                    key={item.id} 
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) => 
                      `flex items-center gap-3 p-2 rounded-md cursor-pointer group ${isCollapsed ? 'justify-center' : ''} ${isActive ? 'bg-[#232323]' : 'hover:bg-[#1f1f1f]'}`
                    }
                 >
                    <div className={`w-12 h-12 min-w-[48px] ${item.bg} rounded-[4px] flex items-center justify-center shadow-lg`}>
                       {item.icon}
                    </div>

                    {!isCollapsed && (
                      <div className="flex flex-col overflow-hidden justify-center">
                         <p className={`font-semibold truncate text-sm mb-0.5 ${item.id === 'liked' ? 'text-spotify-green' : 'text-white'}`}>
                             {item.title}
                         </p>
                         <div className="flex items-center gap-2 text-[#b3b3b3] text-xs truncate">
                             {item.pinned && <Pin size={12} fill="#1ed760" className="text-[#1ed760] shrink-0" />}
                             <span>{item.subtitle}</span>
                         </div>
                      </div>
                    )}
                 </NavLink>
             ))}
          </div>

          {/* hidden admin login button */}
          {!isCollapsed && (
             <div className="absolute bottom-2 left-0 w-full flex justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 py-2 bg-gradient-to-t from-[#121212] to-transparent">
                <button 
                   onClick={() => navigate('/admin/login')}
                   className="text-[#333] hover:text-gray-500 text-[10px] uppercase font-bold tracking-widest cursor-default hover:cursor-pointer"
                >
                   Admin
                </button>
             </div>
          )}
        </div>

        {/* resize handle (desktop only) */}
        <div 
          className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#4d4d4d] active:bg-[#fff] transition-colors z-50 justify-center opacity-0 hover:opacity-100 group-hover:opacity-100 hidden md:flex"
          onMouseDown={startResizing}
        ></div>

      </div>
    </>
  );
};

export default Sidebar;