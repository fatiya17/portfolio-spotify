import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Library, Download } from 'lucide-react'; 
import { useNavigate, useLocation } from 'react-router-dom';

/* --- icon profile --- */
const ProfileFilledIcon = ({ size = 24, fill = "currentColor", className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill={fill}/>
    <path d="M12 14.5C6.99 14.5 2.91 17.86 2.91 22C2.91 22.28 3.13 22.5 3.41 22.5H20.59C20.87 22.5 21.09 22.28 21.09 22C21.09 17.86 17.01 14.5 12 14.5Z" fill={fill}/>
  </svg>
);

const Header = () => {
  const [opacity, setOpacity] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  /* scroll effect */
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    const handleScroll = () => {
      if (mainContent) setOpacity(Math.min(mainContent.scrollTop / 200, 1));
    };
    mainContent?.addEventListener('scroll', handleScroll);
    return () => mainContent?.removeEventListener('scroll', handleScroll);
  }, []);

  /* real-time search */
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    navigate(`/projects?q=${encodeURIComponent(value)}`);
  };

  const isHome = location.pathname === '/';

  return (
    <div
      className="h-16 fixed top-0 left-0 w-full flex items-center justify-between px-4 z-50 transition-colors"
      style={{ backgroundColor: `rgba(0,0,0,${opacity})` }}
    >
      {/* left section */}
      <div className="flex-1 hidden md:flex gap-2 pl-[280px]">
        <button onClick={() => navigate(-1)} className="bg-black/70 p-2 rounded-full text-gray-300 hover:text-white">
          <ChevronLeft size={22} />
        </button>
        <button onClick={() => navigate(1)} className="bg-black/70 p-2 rounded-full text-gray-300 hover:text-white">
          <ChevronRight size={22} />
        </button>
      </div>

      {/* center section */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[480px] hidden md:flex gap-2">
        <button
          onClick={() => navigate('/')}
          className={`p-3 rounded-full ${isHome ? 'bg-[#2a2a2a] text-white' : 'bg-[#1f1f1f] text-gray-400'}`}
        >
          <ProfileFilledIcon />
        </button>

        <div className="relative flex-1 h-12">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search project..."
            className="w-full h-full bg-[#1f1f1f] text-white rounded-full pl-10 pr-12 outline-none focus:ring-2 focus:ring-white/20"
          />
          <Library className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* right section */}
      <div className="flex-1 flex justify-end gap-3">
        <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hidden lg:block">
          Get In Touch
        </button>
        <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center font-bold text-xs">
          F
        </div>
      </div>
    </div>
  );
};

export default Header;
