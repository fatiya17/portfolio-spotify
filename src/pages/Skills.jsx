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
        <section className="relative pt-20 md:pt-24 pb-6 px-4 md:px-8 bg-gradient-to-b from-[#ad4373] via-[#752d4e] to-[#121212] flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 transition-all">
            
            {/* cover image */}
            <div className="shrink-0 shadow-[0_8px_40px_rgba(0,0,0,0.6)] md:shadow-2xl mx-auto md:mx-0">
              <div className="w-[200px] h-[200px] md:w-60 md:h-60 bg-[#2a2a2a] flex items-center justify-center shadow-2xl rounded-md md:rounded-none">
                 <Layers size={80} className="text-pink-400"/>
              </div>
            </div>

            {/* metadata text */}
            <div className="flex flex-col gap-1 text-left w-full">
              <span className="uppercase text-[10px] md:text-xs font-bold tracking-widest text-white hidden md:block">
                Proficiency
              </span>

              <h1 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter text-white drop-shadow-lg mb-2">
                Tech Stack
              </h1>

              <p className="text-gray-300/90 text-xs md:text-sm font-medium max-w-xl">
                Languages, frameworks, and developer tools I use daily.
              </p>

              <div className="flex items-center gap-1 text-xs md:text-sm text-gray-300 mt-2 font-medium">
                <span className="font-bold text-white">Fatiya Labibah</span>
                <span className="mx-1">•</span>
                <span>{techStack.length} Categories</span>
              </div>
            </div>
         </section>

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