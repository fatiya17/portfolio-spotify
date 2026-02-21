import React, { useEffect, useState } from 'react';
import axios from 'axios'; // import axios
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, Loader } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const Experience = () => {
  const [experienceData, setExperienceData] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://portfolio-be-five-dun.vercel.app/api/experience");
        setExperienceData(res.data);
      } catch (error) {
        console.error("error fetching experience:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <PageTransition>
      <div className="h-full overflow-y-auto custom-scrollbar bg-[#121212] pb-32 md:pb-0">
         
         {/* header consistent with home */}
         <div className="relative bg-gradient-to-b from-[#1d6d48] via-[#12422c] to-[#121212] pt-24 pb-12 px-6 md:px-10 lg:px-14 flex flex-col md:flex-row items-end gap-6 md:gap-10 transition-colors duration-500">
            
            {/* icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-32 h-32 md:w-52 md:h-52 bg-[#2a2a2a] shadow-[0_8px_40px_rgba(0,0,0,0.5)] rounded-full md:rounded-md flex items-center justify-center shrink-0 group hover:scale-105 transition-transform duration-500"
            >
               <Briefcase className="text-green-500 drop-shadow-md w-14 h-14 md:w-24 md:h-24 group-hover:rotate-12 transition-transform duration-500"/>
            </motion.div>

            {/* title */}
            <div className="flex flex-col gap-2 w-full z-10 pb-1">
              <span className="text-xs font-bold tracking-widest uppercase text-white flex items-center gap-1.5">
                <Briefcase size={16} className="text-green-500 fill-white" />{" "}
                Career History
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl  font-black tracking-tighter text-white drop-shadow-2xl leading-tight">
                Experience
              </h1>
              <p className="text-gray-300 font-medium text-sm md:text-base mt-3 max-w-2xl leading-relaxed">
                My professional journey, internships, and work history.
              </p>
            </div>
         </div>

         {/* content list */}
         <div className="px-4 md:px-8 space-y-4 pb-24 mt-6">
            {loading ? (
               <div className="flex justify-center py-10">
                  <Loader className="animate-spin text-green-500" size={32}/>
               </div>
            ) : (
               experienceData.map((item, idx) => (
                  <motion.div 
                     key={item._id || item.id}
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
                         {item.link ? (
                            <a 
                               href={item.link} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="text-spotify-green text-sm font-bold mb-2 inline-block hover:text-white hover:underline transition-all"
                            >
                               {item.company}
                            </a>
                         ) : (
                            <p className="text-spotify-green text-sm font-bold mb-2">{item.company}</p>
                         )}
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
               ))
            )}
         </div>
      </div>
    </PageTransition>
  );
};

export default Experience;