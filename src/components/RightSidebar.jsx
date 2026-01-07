import React, { useState, useEffect } from 'react';
import { 
  X, MoreHorizontal, Github, ExternalLink, ChevronDown, 
  Maximize2, Minimize2, ChevronLeft, ChevronRight,
  Users, Calendar, Clock, Tag 
} from 'lucide-react';

const RightSidebar = ({ project, onClose, isMobileFull, isExpanded, onToggleExpand }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // merge cover image with gallery
  const images = [
    { url: project.imageUrl, caption: 'Cover Image' },
    ...(project.gallery || [])
  ].filter(img => img.url);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  let containerClass = "";
  
  if (isMobileFull) {
      // mobile full screen
      containerClass = "w-full h-full bg-gradient-to-b from-gray-900 to-black text-white flex flex-col overflow-hidden";
  } else if (isExpanded) {
      // desktop expanded mode
      containerClass = "flex-1 bg-[#121212] rounded-lg hidden lg:flex flex-col text-white h-full border-l border-[#282828] custom-scrollbar transition-all duration-300 overflow-hidden";
  } else {
      // desktop sidebar normal
      containerClass = "w-[300px] xl:w-[340px] bg-[#121212] rounded-lg hidden lg:flex flex-col text-white h-full border-l border-[#282828] custom-scrollbar shrink-0 transition-all duration-300 overflow-hidden";
  }

  const headerClass = isMobileFull
    ? "p-6 pt-12 flex justify-between items-start bg-transparent z-20 shrink-0 gap-3"
    : "p-4 flex justify-between items-start bg-[#121212] z-20 shrink-0 shadow-sm gap-3";

  return (
    <div className={containerClass}>
      
      {/* header */}
      <div className={headerClass}>
        {isMobileFull ? (
            <button onClick={onClose} className="text-white pt-1"><ChevronDown size={28} /></button>
        ) : (
            <span className="font-bold text-base hover:underline cursor-pointer flex-1 whitespace-normal break-words leading-tight text-left mt-1">
                {project.title}
            </span>
        )}
        
        {isMobileFull && (
            <span className="text-xs font-bold tracking-widest uppercase text-gray-300 pt-2">
                Now Playing
            </span>
        )}

        <div className="flex gap-4 shrink-0 text-gray-400 pt-0.5">
            {!isMobileFull && (
                <button 
                    onClick={onToggleExpand} 
                    className="hover:text-white transition" 
                    title={isExpanded ? "Minimize" : "Expand"}
                >
                    {isExpanded ? <Minimize2 size={20}/> : <Maximize2 size={20}/>} 
                </button>
            )}
            
            {/* close button */}
            {!isMobileFull && (
                <button onClick={onClose} className="hover:text-white transition">
                    <X size={20}/>
                </button>
            )}
            
            {isMobileFull && <button><MoreHorizontal size={24}/></button>}
        </div>
      </div>

      <div className={`
          flex-1 overflow-y-auto custom-scrollbar flex 
          ${isExpanded ? 'flex-col px-32 py-8' : 'flex-col justify-start px-6 pb-12'} 
      `}>
          
          {/* image display container */}
          <div className={`
              rounded-lg overflow-hidden shadow-2xl relative group transition-all duration-500 shrink-0
              ${isExpanded ? 'max-w-[720px] mx-auto mb-8 shadow-black/50' : 'w-full mb-8'} 
              ${isMobileFull ? 'shadow-black/50 mb-8' : ''}
          `}>
            
            {/* main image */}
            {images.length > 0 ? (
                <img 
                    src={images[currentImageIndex].url} 
                    alt={project.title} 
                    // changed: ALWAYS h-auto object-contain (never 1:1 crop)
                    className="w-full h-auto object-contain bg-black/20" 
                />
            ) : (
                <div className="w-full h-64 flex items-center justify-center text-gray-500 bg-[#222]">No Image</div>
            )}

            {/* caption label (left front) */}
            {images.length > 0 && images[currentImageIndex].caption && (
                <div className="absolute top-4 left-4 z-20 max-w-[80%]">
                    <span className="bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg border border-white/10">
                        {images[currentImageIndex].caption}
                    </span>
                </div>
            )}

            {/* navigation chevrons */}
            {images.length > 1 && (
                <>
                    <button 
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-20 backdrop-blur-sm"
                    >
                        <ChevronLeft size={28} />
                    </button>
                    <button 
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-20 backdrop-blur-sm"
                    >
                        <ChevronRight size={28} />
                    </button>
                </>
            )}

            {/* thumbnails preview (bottom center front overlay) */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 max-w-[90%]">
                    <div className="flex gap-2 overflow-x-auto p-1.5 bg-black/50 backdrop-blur-md rounded-xl border border-white/10 custom-scrollbar-hide">
                        {images.map((img, idx) => (
                            <button 
                                key={idx} 
                                onClick={() => setCurrentImageIndex(idx)}
                                className={`
                                    shrink-0 ${isMobileFull || !isExpanded ? 'w-8 h-8' : 'w-10 h-10'} rounded-md overflow-hidden border-2 transition-all
                                    ${currentImageIndex === idx ? 'border-green-500 opacity-100 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}
                                `}
                            >
                                <img src={img.url} alt="thumb" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
          </div>

          {/* info & actions */}
          <div className={`
              ${isExpanded ? 'w-full max-w-4xl mx-auto' : 'w-full'}
          `}>
              
              {/* title & basic meta */}
              <div className="mb-6">
                <h2 className={`font-bold mb-2 leading-tight ${isExpanded ? 'text-4xl md:text-5xl tracking-tight' : isMobileFull ? 'text-3xl' : 'text-2xl'}`}>
                    {project.title}
                </h2>
                <p className="text-gray-400 text-lg font-medium">{project.category} • {project.year || '2025'}</p>
              </div>

              {/* metadata grid */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="bg-[#2a2a2a] p-3 rounded-lg flex items-center gap-3 border border-transparent hover:border-[#444] transition">
                      <Users className="text-blue-400 shrink-0" size={20} />
                      <div className="overflow-hidden">
                          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Type</p>
                          <p className="text-sm font-semibold truncate text-white">{project.projectType || 'Individual'}</p>
                      </div>
                  </div>
                  <div className="bg-[#2a2a2a] p-3 rounded-lg flex items-center gap-3 border border-transparent hover:border-[#444] transition">
                      <Tag className="text-green-400 shrink-0" size={20} />
                      <div className="overflow-hidden">
                          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Team Size</p>
                          <p className="text-sm font-semibold truncate text-white">{project.teamSize || 1} Person(s)</p>
                      </div>
                  </div>
                  <div className="bg-[#2a2a2a] p-3 rounded-lg flex items-center gap-3 border border-transparent hover:border-[#444] transition">
                      <Clock className="text-orange-400 shrink-0" size={20} />
                      <div className="overflow-hidden">
                          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Duration</p>
                          <p className="text-sm font-semibold truncate text-white">{project.duration || '-'}</p>
                      </div>
                  </div>
                  <div className="bg-[#2a2a2a] p-3 rounded-lg flex items-center gap-3 border border-transparent hover:border-[#444] transition">
                      <Calendar className="text-pink-400 shrink-0" size={20} />
                      <div className="overflow-hidden">
                          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Year</p>
                          <p className="text-sm font-semibold truncate text-white">{project.year || '2025'}</p>
                      </div>
                  </div>
              </div>

              {/* description & problem solved */}
              <div className="mb-8 space-y-6">
                  <div>
                      <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-2">Description</h3>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed whitespace-pre-line">
                          {project.description || "No description provided."}
                      </p>
                  </div>

                  {project.problemSolved && (
                      <div>
                          <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-2">Problem Solved</h3>
                          <p className="text-gray-400 text-sm md:text-base leading-relaxed italic border-l-2 border-green-500 pl-3">
                              "{project.problemSolved}"
                          </p>
                      </div>
                  )}
              </div>

              {/* tech stack */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                    {project.techStack && project.techStack.map((tech, idx) => (
                        <span key={idx} className="text-xs font-bold bg-[#2a2a2a] px-3 py-1.5 rounded-full text-white border border-transparent hover:border-gray-500 transition cursor-default">
                            {tech}
                        </span>
                    ))}
                </div>
              </div>

              {/* action buttons */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                   <a href={project.githubLink || "#"} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#1ed760] hover:bg-[#1db954] text-black font-bold py-3 rounded-full transition transform hover:scale-105 active:scale-95 text-sm">
                      <Github size={20}/> Code
                   </a>
                   <a href={project.demoLink || "#"} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 border border-gray-500 text-white font-bold py-3 rounded-full hover:border-white transition transform hover:scale-105 active:scale-95 text-sm">
                      <ExternalLink size={20}/> Demo
                   </a>
              </div>

              {/* credits */}
              {!isExpanded && (
                  <div className="bg-[#242424] rounded-lg p-4">
                      <div className="flex justify-between items-end mb-4">
                          <h3 className="font-bold text-base">Credits</h3>
                          <span className="text-xs font-bold text-gray-400">Show all</span>
                      </div>
                      <div className="flex items-center justify-between">
                          <div>
                              <h4 className="font-bold text-sm">Fatiya Labibah</h4>
                              <p className="text-xs text-gray-400">Creator</p>
                          </div>
                          <a href="https://github.com/fatiya17" target="_blank" rel="noopener noreferrer" className="border border-gray-600 px-3 py-1 rounded-full text-xs font-bold hover:border-white transition inline-block text-center">Follow</a>
                      </div>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};

export default RightSidebar;