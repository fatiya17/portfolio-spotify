import React from 'react';
import { X, MoreHorizontal, Github, ExternalLink, ChevronDown, Maximize2, Minimize2 } from 'lucide-react';

const RightSidebar = ({ project, onClose, isMobileFull, isExpanded, onToggleExpand }) => {

  let containerClass = "";
  
  if (isMobileFull) {
      // mobile  full screen
      containerClass = "w-full h-full bg-gradient-to-b from-gray-900 to-black text-white flex flex-col overflow-hidden";
  } else if (isExpanded) {
      // desktop expanded mode
      containerClass = "flex-1 bg-[#121212] rounded-lg hidden lg:flex flex-col text-white h-full border-l border-[#282828] custom-scrollbar transition-all duration-300 overflow-hidden";
  } else {
      // desktop sidebar normal
      containerClass = "w-[300px] xl:w-[340px] bg-[#121212] rounded-lg hidden lg:flex flex-col text-white h-full border-l border-[#282828] custom-scrollbar shrink-0 transition-all duration-300 overflow-hidden";
  }

  const headerClass = isMobileFull
    ? "p-6 pt-12 flex justify-between items-center bg-transparent z-20 shrink-0"
    : "p-4 flex justify-between items-center bg-[#121212] z-20 shrink-0 shadow-sm";

  return (
    <div className={containerClass}>
      
      <div className={headerClass}>
        {isMobileFull ? (
            <button onClick={onClose} className="text-white"><ChevronDown size={28} /></button>
        ) : (
            // remove truncate to prevent title cutoff
            <span className="font-bold text-base hover:underline cursor-pointer pr-2 flex-1 leading-tight">
                {project.title}
            </span>
        )}
        
        {isMobileFull && (
            <span className="text-xs font-bold tracking-widest uppercase text-gray-300">
                Now Playing
            </span>
        )}

        <div className="flex gap-4 shrink-0 text-gray-400">
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
          ${isExpanded ? 'flex-row items-center justify-center p-12 gap-12' : 'flex-col justify-start px-6 pb-12'}
      `}>
          
          {/* image */}
          <div className={`
              rounded-lg overflow-hidden shadow-2xl relative group transition-all duration-500 shrink-0
              ${isExpanded ? 'w-[400px] h-[400px] shadow-black/50' : 'w-full aspect-square mb-8'} 
              ${isMobileFull ? 'shadow-black/50 mb-8' : ''}
          `}>
            <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover" 
            />
          </div>

          {/* info & actions */}
          <div className={`
              ${isExpanded ? 'max-w-xl flex flex-col justify-start h-full' : 'w-full'}
          `}>
              
              {/* title */}
              <div className="mb-6">
                <h2 className={`font-bold mb-2 leading-tight ${isExpanded ? 'text-5xl md:text-6xl tracking-tight' : isMobileFull ? 'text-3xl' : 'text-2xl'}`}>
                    {project.title}
                </h2>
                <p className="text-gray-400 text-lg font-medium">{project.category} • 2025</p>
              </div>

              {/* progress bar mobile */}
              {isMobileFull && (
                  <div className="w-full mb-8">
                      <div className="h-1 bg-gray-600 rounded-full w-full mb-2">
                          <div className="h-full bg-white w-1/3 rounded-full relative">
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow"></div>
                          </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 font-mono">
                          <span>0:42</span>
                          <span>3:15</span>
                      </div>
                  </div>
              )}

              {/* description & problem solved */}
              <div className="mb-8 space-y-6">
                  <div>
                      <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-2">Description</h3>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed">
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
              <div className="flex flex-wrap gap-2 mb-8">
                {project.techStack && project.techStack.map((tech, idx) => (
                    <span key={idx} className="text-xs font-bold bg-[#2a2a2a] px-3 py-1.5 rounded-full text-white border border-transparent hover:border-gray-500 transition cursor-default">
                        {tech}
                    </span>
                ))}
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
                          <button className="border border-gray-600 px-3 py-1 rounded-full text-xs font-bold hover:border-white transition">Follow</button>
                      </div>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};

export default RightSidebar;