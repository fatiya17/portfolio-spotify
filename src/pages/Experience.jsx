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
        const res = await axios.get("http://localhost:5000/api/experience");
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
         <section className="relative pt-20 md:pt-24 pb-6 px-4 md:px-8 bg-gradient-to-b from-[#1d6d48] via-[#12422c] to-[#121212] flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 transition-all">
            
            {/* cover image */}
            <div className="shrink-0 shadow-[0_8px_40px_rgba(0,0,0,0.6)] md:shadow-2xl mx-auto md:mx-0">
              <div className="w-[200px] h-[200px] md:w-60 md:h-60 bg-[#2a2a2a] flex items-center justify-center shadow-2xl rounded-md md:rounded-none">
                 <Briefcase size={80} className="text-green-500"/>
              </div>
            </div>

            {/* metadata text */}
            <div className="flex flex-col gap-1 text-left w-full">
              <span className="uppercase text-[10px] md:text-xs font-bold tracking-widest text-white hidden md:block">
                Career History
              </span>

              <h1 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter text-white drop-shadow-lg mb-2">
                Experience
              </h1>

              <p className="text-gray-300/90 text-xs md:text-sm font-medium max-w-xl">
                My professional journey, internships, and work history.
              </p>

              <div className="flex items-center gap-1 text-xs md:text-sm text-gray-300 mt-2 font-medium">
                <CheckCircle2 size={16} className="text-green-500 fill-black" />
                <span className="font-bold text-white">Fatiya Dev</span>
                <span className="mx-1">•</span>
                <span>{experienceData.length} roles</span>
              </div>
            </div>
         </section>

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
               ))
            )}
         </div>
      </div>
    </PageTransition>
  );
};

export default Experience;