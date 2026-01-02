import React from 'react';
import { Play } from 'lucide-react';

const ProjectCard = ({ project, onClick }) => {
  return (
    <div 
      onClick={() => onClick(project)}
      className="group/card bg-[#181818] hover:bg-[#282828] p-3 md:p-4 rounded-md transition-all duration-300 ease-out cursor-pointer relative flex flex-col gap-3 hover:shadow-lg"
    >
      {/* image */}
      <div className="relative w-full aspect-square rounded-md overflow-hidden shadow-black/40 shadow-lg mb-1">
        <img 
          src={project.imageUrl || "https://via.placeholder.com/300"} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105" 
        />
        
        {/* hover play button */}
        <div className="absolute bottom-2 right-2 translate-y-4 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300 ease-out shadow-xl z-10">
          <button className="bg-spotify-green text-black rounded-full p-3 hover:scale-110 hover:brightness-105 transform shadow-md flex items-center justify-center transition">
            <Play fill="black" size={20} className="ml-0.5" />
          </button>
        </div>
      </div>

      {/* title */}
      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-white truncate text-sm md:text-base tracking-tight">
            {project.title}
        </h3>

        {/* subtitle */}
        <p className="text-[#a7a7a7] text-xs md:text-sm truncate font-medium">
            {project.category} • 2025
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;