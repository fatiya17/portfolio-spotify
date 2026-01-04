import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Code, Wrench, Layers, Loader } from 'lucide-react'; 
import PageTransition from '../components/PageTransition';

// import all icons used
import { 
  SiReact, SiVuedotjs, SiTailwindcss, SiFramer, 
  SiNodedotjs, SiExpress, SiLaravel, SiGo,
  SiMongodb, SiMysql, SiFirebase, SiAmazonwebservices,
  SiGithub, SiDocker, SiFigma, SiPostman
} from "react-icons/si";

// icon mapping dictionary
const ICON_MAP = {
  SiReact, SiVuedotjs, SiTailwindcss, SiFramer,
  SiNodedotjs, SiExpress, SiLaravel, SiGo,
  SiMongodb, SiMysql, SiFirebase, SiAmazonwebservices,
  SiGithub, SiDocker, SiFigma, SiPostman
};

// category icon mapping
const CATEGORY_ICON_MAP = {
  Layout: <Layout size={20} />,
  Server: <Server size={20} />,
  Database: <Database size={20} />,
  Wrench: <Wrench size={20} />,
  Code: <Code size={20} />
};

const Skills = () => {
  const [techStack, setTechStack] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/skills");
        setTechStack(res.data);
      } catch (error) {
        console.error("error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <PageTransition>
      <div className="h-full overflow-y-auto bg-[#121212] pb-32 md:pb-0 custom-scrollbar">

        {/* header consistent with home */}
        <div className="relative bg-gradient-to-b from-[#ad4373] via-[#752d4e] to-[#121212] pt-24 pb-12 px-6 md:px-10 lg:px-14 flex flex-col md:flex-row items-end gap-6 md:gap-10 transition-colors duration-500">
            
            {/* icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-32 h-32 md:w-52 md:h-52 bg-[#2a2a2a] shadow-[0_8px_40px_rgba(0,0,0,0.5)] rounded-full md:rounded-md flex items-center justify-center shrink-0 group hover:scale-105 transition-transform duration-500"
            >
               <Layers className="text-pink-400 drop-shadow-md w-14 h-14 md:w-24 md:h-24 group-hover:rotate-12 transition-transform duration-500"/>
            </motion.div>

            {/* title */}
            <div className="flex flex-col gap-2 w-full z-10 pb-1">
              <span className="text-xs font-bold tracking-widest uppercase text-white flex items-center gap-1.5">
                <Layers size={16} className="text-pink-400 fill-white" />{" "}
                Proficiency
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white drop-shadow-2xl leading-tight">
                Tech Stack
              </h1>
              <p className="text-gray-300 font-medium text-sm md:text-base mt-3 max-w-2xl leading-relaxed">
                Languages, frameworks, and developer tools I use daily.
              </p>
            </div>
         </div>

        {/* content grid */}
        <div className="px-4 md:px-8 pb-24 mt-6">
          {loading ? (
             <div className="flex justify-center py-10">
                <Loader className="animate-spin text-pink-400" size={32}/>
             </div>
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {techStack.map((stack, idx) => (
                 <motion.div
                   key={stack._id || idx}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: idx * 0.1 }}
                   className={`
                     bg-[#181818]
                     hover:bg-[#202020]
                     transition-all
                     duration-300
                     rounded-xl
                     p-5 sm:p-6
                     group
                     border border-transparent
                     hover:border-[#333]
                     flex flex-col
                   `}
                 >
                   {/* title category */}
                   <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#2a2a2a]">
                     <div className={`p-2 rounded-md ${stack.bg} ${stack.color}`}>
                       {CATEGORY_ICON_MAP[stack.iconName] || <Code size={20} />}
                     </div>
                     <h3 className="font-bold text-lg sm:text-xl text-white tracking-tight">
                       {stack.category}
                     </h3>
                   </div>

                   {/* icon grid - using mapping */}
                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                     {stack.items.map((tech, i) => {
                       const IconComponent = ICON_MAP[tech.iconKey] || Code;
                       return (
                         <div
                           key={i}
                           className="flex flex-col items-center gap-2 group/icon p-2 rounded-lg hover:bg-[#2a2a2a] transition cursor-default"
                         >
                           <div
                             className="
                               flex items-center justify-center
                               w-12 h-12
                               transition-transform
                               duration-300
                               group-hover/icon:scale-110
                               drop-shadow-lg
                             "
                             style={{ color: tech.color }} 
                           >
                             <IconComponent size={32} />
                           </div>
                           <span className="text-[11px] font-semibold text-gray-400 group-hover/icon:text-white transition-colors">
                             {tech.name}
                           </span>
                         </div>
                       );
                     })}
                   </div>

                 </motion.div>
               ))}
             </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Skills;