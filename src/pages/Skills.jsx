import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Code, Wrench, Layers } from 'lucide-react'; 
import PageTransition from '../components/PageTransition';

import { 
  SiReact, SiVuedotjs, SiTailwindcss, SiFramer, 
  SiNodedotjs, SiExpress, SiLaravel, SiGo,
  SiMongodb, SiMysql, SiFirebase, SiAmazonwebservices,
  SiGithub, SiDocker, SiFigma, SiPostman
} from "react-icons/si";

// icon with colors and names
const TECH_STACK_DATA = [
  {
    category: "Frontend",
    icon: <Layout size={20} />,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    items: [
      { name: "React", icon: <SiReact />, color: "#61DAFB" },
      { name: "Vue", icon: <SiVuedotjs />, color: "#4FC08D" },
      { name: "Tailwind", icon: <SiTailwindcss />, color: "#06B6D4" },
      { name: "Framer", icon: <SiFramer />, color: "#0055FF" }
    ]
  },
  {
    category: "Backend",
    icon: <Server size={20} />,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    items: [
      { name: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
      { name: "Express", icon: <SiExpress />, color: "#ffffff" }, 
      { name: "Laravel", icon: <SiLaravel />, color: "#FF2D20" },
      { name: "Go", icon: <SiGo />, color: "#00ADD8" }
    ]
  },
  {
    category: "Database & Cloud",
    icon: <Database size={20} />,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    items: [
      { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
      { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
      { name: "Firebase", icon: <SiFirebase />, color: "#FFCA28" },
      { name: "AWS", icon: <SiAmazonwebservices />, color: "#FF9900" }
    ]
  },
  {
    category: "Tools",
    icon: <Wrench size={20} />,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    items: [
      { name: "Github", icon: <SiGithub />, color: "#ffffff" },
      { name: "Docker", icon: <SiDocker />, color: "#2496ED" },
      { name: "Figma", icon: <SiFigma />, color: "#F24E1E" },
      { name: "Postman", icon: <SiPostman />, color: "#FF6C37" }
    ]
  }
];

const Skills = () => {
  return (
    <PageTransition>
      <div className="h-full overflow-y-auto bg-[#121212] pb-32 md:pb-0 custom-scrollbar">

        {/* header */}
        <section className="relative pt-20 md:pt-24 pb-6 px-4 md:px-8 bg-gradient-to-b from-[#ad4373] via-[#752d4e] to-[#121212] flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 transition-all">
            
            {/* cover image */}
            <div className="shrink-0 shadow-[0_8px_40px_rgba(0,0,0,0.6)] md:shadow-2xl mx-auto md:mx-0">
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=500" 
                alt="Tech Stack Cover"
                className="w-[200px] h-[200px] md:w-60 md:h-60 object-cover shadow-2xl rounded-md md:rounded-none"
              />
            </div>

            {/* metadata text */}
            <div className="flex flex-col gap-1 text-left w-full">
              <span className="uppercase text-[10px] md:text-xs font-bold tracking-widest text-white hidden md:block">
                Proficiency
              </span>

              <h1 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter text-white drop-shadow-lg mb-1 md:mb-2">
                Tech Stack
              </h1>

              <p className="text-gray-300/90 text-xs md:text-sm font-medium max-w-xl">
                Languages, frameworks, and developer tools I use daily.
              </p>

              <div className="flex items-center gap-1 text-xs md:text-sm text-gray-300 mt-2 font-medium">
                <Layers size={16} className="text-pink-400" />
                <span>Full Stack</span>
                <span className="mx-1">•</span>
                <span>{TECH_STACK_DATA.length} Categories</span>
              </div>
            </div>
         </section>

        {/* content */}
        <div className="px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6 pb-24">
          {TECH_STACK_DATA.map((stack, idx) => (
            <motion.div
              key={idx}
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
                  {stack.icon}
                </div>
                <h3 className="font-bold text-lg sm:text-xl text-white tracking-tight">
                  {stack.category}
                </h3>
              </div>

              {/* icon grid - refined */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stack.items.map((tech, i) => (
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
                      {React.cloneElement(tech.icon, { size: 32 })}
                    </div>
                    <span className="text-[11px] font-semibold text-gray-400 group-hover/icon:text-white transition-colors">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Skills;