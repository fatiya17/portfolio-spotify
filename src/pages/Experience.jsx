import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import PageTransition from '../components/PageTransition';

// DATA DUMMY
const EXPERIENCE_DATA = [
  {
    id: 1,
    role: "Frontend Developer Intern",
    company: "Tech Startup Inc.",
    location: "Jakarta, Indonesia",
    period: "Aug 2025 - Present",
    type: "Full-time",
    description: "Developing responsive web applications using React.js and Tailwind CSS. Collaborating with UI/UX designers.",
    skills: ["React", "Tailwind", "Figma", "Git"]
  },
  {
    id: 2,
    role: "Laboratory Assistant",
    company: "University Computer Lab",
    location: "Depok, Indonesia",
    period: "Jan 2024 - Jul 2024",
    type: "Part-time",
    description: "Assisted students with C++ and Java programming assignments. Maintained lab equipment.",
    skills: ["C++", "Java", "Teaching", "Linux"]
  }
];

const Experience = () => {
  return (
    <PageTransition>
      <div className="h-full overflow-y-auto custom-scrollbar bg-[#121212] pb-32 md:pb-0">
         
         {/* header */}
         <section className="relative pt-20 md:pt-24 pb-6 px-4 md:px-8 bg-gradient-to-b from-[#1d6d48] via-[#12422c] to-[#121212] flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 transition-all">
            
            {/* cover image */}
            <div className="shrink-0 shadow-[0_8px_40px_rgba(0,0,0,0.6)] md:shadow-2xl mx-auto md:mx-0">
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=500" 
                alt="Experience Cover"
                className="w-[200px] h-[200px] md:w-60 md:h-60 object-cover shadow-2xl rounded-md md:rounded-none"
              />
            </div>

            {/* metadata text */}
            <div className="flex flex-col gap-1 text-left w-full">
              <span className="uppercase text-[10px] md:text-xs font-bold tracking-widest text-white hidden md:block">
                Career History
              </span>

              <h1 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter text-white drop-shadow-lg mb-1 md:mb-2">
                Work Experience
              </h1>

              <p className="text-gray-300/90 text-xs md:text-sm font-medium max-w-xl">
                My professional journey, internships, and work history.
              </p>

              <div className="flex items-center gap-1 text-xs md:text-sm text-gray-300 mt-2 font-medium">
                <CheckCircle2 size={16} className="text-green-500 fill-black" />
                <span>Verified Professional</span>
                <span className="mx-1">•</span>
                <span>{EXPERIENCE_DATA.length} roles</span>
              </div>
            </div>
         </section>

         <div className="px-4 md:px-8 space-y-4 pb-24 mt-4">
            {EXPERIENCE_DATA.map((item, idx) => (
               <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#181818] p-5 rounded-lg hover:bg-[#282828] transition border border-transparent hover:border-[#333] flex flex-col md:flex-row gap-4 group"
               >
                  <div className="md:w-48 shrink-0 flex flex-col gap-1">
                      <span className="text-white font-bold text-sm flex items-center gap-2">
                         <Calendar size={14} className="text-gray-400"/> {item.period}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">{item.type}</span>
                      <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                         <MapPin size={12}/> {item.location}
                      </span>
                   </div>
                   <div className="flex-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition">{item.role}</h3>
                      <p className="text-spotify-green text-sm font-bold mb-2">{item.company}</p>
                      <p className="text-gray-400 text-sm leading-relaxed mb-3">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                         {item.skills.map(skill => (
                            <span key={skill} className="px-2 py-1 bg-[#2a2a2a] text-xs text-gray-300 rounded hover:text-white transition">
                               {skill}
                            </span>
                         ))}
                      </div>
                   </div>
               </motion.div>
            ))}
         </div>
      </div>
    </PageTransition>
  );
};

export default Experience;