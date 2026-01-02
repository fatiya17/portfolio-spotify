import React, { useState } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, 
  Heart, Github, ExternalLink, Share2, Info 
} from 'lucide-react';

const PlayerBar = ({ project, onOpenMobilePlayer }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  if (!project) return null;

  const togglePlay = (e) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const openLink = (url) => {
    if (url) window.open(url, "_blank");
  };

  const copyLink = (e) => {
    e.stopPropagation();
    alert(`Link to ${project.title} copied to clipboard!`);
  };

  return (
    <>
      <div className="hidden md:flex w-full h-[90px] bg-black border-t border-[#282828] px-4 z-50 items-center justify-between shrink-0">
          
          {/* info project */}
          <div className="flex items-center gap-3 w-[30%] min-w-0">
            <img 
                src={project.imageUrl} 
                alt="" 
                className="w-14 h-14 rounded-[4px] object-cover shadow-sm cursor-pointer hover:opacity-80 transition shrink-0"
                onClick={onOpenMobilePlayer}
            />
            <div className="flex flex-col justify-center overflow-hidden mr-2 min-w-0">
              <h4 className="font-bold text-white text-sm truncate hover:underline cursor-pointer block">
                  {project.title}
              </h4>
              <p className="text-xs text-gray-400 truncate hover:underline cursor-pointer block">
                  {project.techStack?.[0]}
              </p>
            </div>
            <button className="text-gray-400 hover:text-green-500 transition ml-2 shrink-0">
                <Heart size={18}/>
            </button>
          </div>

          {/* center: controls */}
          <div className="flex flex-col items-center max-w-[40%] w-full gap-1">
            <div className="flex items-center gap-6">
                <button className="text-gray-400 hover:text-white transition" title="Previous">
                    <SkipBack fill="currentColor" size={20}/>
                </button>
                
                <button 
                    onClick={() => setIsPlaying(!isPlaying)} 
                    className="bg-white rounded-full p-2 hover:scale-105 active:scale-95 transition shadow-lg flex items-center justify-center"
                >
                    {isPlaying ? <Pause fill="black" size={20} /> : <Play fill="black" size={20} className="ml-0.5" />}
                </button>
                
                <button className="text-gray-400 hover:text-white transition" title="Next">
                    <SkipForward fill="currentColor" size={20}/>
                </button>
            </div>
            
            <div className="flex items-center gap-2 w-full text-xs text-gray-400 font-mono">
                <span>0:00</span>
                <div className="h-1 bg-[#4d4d4d] rounded-full w-full relative group cursor-pointer">
                    <div className="absolute top-0 left-0 h-full bg-white rounded-full group-hover:bg-spotify-green transition-colors w-1/3"></div>
                </div>
                <span>Demo</span>
            </div>
          </div>

          {/* 3. RIGHT: Actions */}
          <div className="flex items-center justify-end w-[30%] gap-2 text-gray-400">
             <button onClick={() => openLink(project.githubLink)} className="hover:text-white hover:scale-110 transition p-2" title="Source Code">
                <Github size={18}/>
             </button>
             <button onClick={() => openLink(project.demoLink)} className="hover:text-white hover:scale-110 transition p-2" title="Live Demo">
                <ExternalLink size={18}/>
             </button>
             <button onClick={copyLink} className="hover:text-white hover:scale-110 transition p-2" title="Share">
                <Share2 size={18}/>
             </button>
             <div className="w-[1px] h-4 bg-gray-700 mx-1"></div>
             <button className="hover:text-white hover:scale-110 transition p-2" title="Details">
                <Info size={18}/>
             </button>
          </div>
      </div>

      {/* mobile mini player */}
      <div 
        onClick={onOpenMobilePlayer}
        className="md:hidden fixed bottom-[68px] left-2 right-2 h-14 bg-[#3E3E3E] rounded-md shadow-xl px-3 flex items-center justify-between z-[60] cursor-pointer animate-in slide-in-from-bottom-4"
      >
          <div className="flex items-center gap-3 overflow-hidden min-w-0 flex-1">
             <img src={project.imageUrl} alt="" className="w-10 h-10 rounded-[4px] object-cover shrink-0 block"/>
             <div className="flex flex-col min-w-0 flex-1">
                <span className="text-white font-bold text-sm truncate pr-2 block">{project.title}</span>
                <span className="text-xs text-gray-300 truncate block">{project.techStack?.[0]}</span>
             </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
              <button className="text-gray-300 hover:text-white" onClick={copyLink}>
                  <Share2 size={20} />
              </button>
              
              <button onClick={togglePlay} className="text-white">
                 {isPlaying ? <Pause fill="white" size={24} /> : <Play fill="white" size={24} />}
              </button>
          </div>
          
          <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-white/20 rounded-b-md overflow-hidden">
             <div className="h-full bg-white w-1/3 rounded-full"></div>
          </div>
      </div>
    </>
  );
};

export default PlayerBar;