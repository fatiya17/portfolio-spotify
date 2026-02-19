import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Loader } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const Education = () => {
  const [educationData, setEducationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://portfolio-be-five-dun.vercel.app/api/education");
        setEducationData(res.data);
      } catch (error) {
        console.error("error fetching education:", error);
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
        <div className="relative bg-gradient-to-b from-[#3b65bd] via-[#243e73] to-[#121212] pt-24 pb-12 px-6 md:px-10 lg:px-14 flex flex-col md:flex-row items-end gap-6 md:gap-10 transition-colors duration-500">
            
            {/* icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-32 h-32 md:w-52 md:h-52 bg-[#2a2a2a] shadow-[0_8px_40px_rgba(0,0,0,0.5)] rounded-full md:rounded-md flex items-center justify-center shrink-0 group hover:scale-105 transition-transform duration-500"
            >
               <GraduationCap className="text-blue-400 drop-shadow-md w-14 h-14 md:w-24 md:h-24 group-hover:rotate-12 transition-transform duration-500"/>
            </motion.div>

            {/* title */}
            <div className="flex flex-col gap-2 w-full z-10 pb-1">
              <span className="text-xs font-bold tracking-widest uppercase text-white flex items-center gap-1.5">
                <GraduationCap size={16} className="text-blue-400 fill-white" />{" "}
                Academic Background
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl  font-black tracking-tighter text-white drop-shadow-2xl leading-tight">
                Education
              </h1>
              <p className="text-gray-300 font-medium text-sm md:text-base mt-3 max-w-2xl leading-relaxed">
                Degrees, certifications, and academic achievements.
              </p>
            </div>
         </div>

        {/* content */}
        <div className="px-4 md:px-8 grid grid-cols-1 gap-4 mt-6 pb-24">
          {loading ? (
             <div className="flex justify-center py-10">
                <Loader className="animate-spin text-blue-400" size={32}/>
             </div>
          ) : (
             educationData.map((edu, idx) => (
                <motion.div
                  key={edu._id || edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="
                    bg-[#181818]
                    hover:bg-[#282828]
                    transition-all
                    duration-300
                    rounded-xl
                    p-4 sm:p-6
                    flex
                    flex-col
                    md:flex-row
                    md:items-start
                    gap-4
                    group
                  "
                >
                  {/* left */}
                  <div className="flex-1">
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-3">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition shrink-0 ${edu.imageUrl ? 'bg-transparent' : 'rounded-full bg-[#2a2a2a] group-hover:bg-blue-400/20'}`}>
                        {edu.imageUrl ? (
                            <img src={edu.imageUrl} alt={edu.school} className="w-full h-full object-contain" />
                        ) : (
                            <GraduationCap size={20} className="text-blue-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-white text-base sm:text-lg font-bold leading-snug group-hover:text-blue-400 transition">
                          {edu.school}
                        </h3>
                        <p className="text-gray-400 text-sm font-medium">
                          {edu.degree}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed ml-0 sm:ml-14">
                      {edu.desc}
                    </p>
                  </div>

                  {/* right */}
                  <div className="flex flex-row md:flex-col justify-between md:items-end text-left md:text-right gap-2 sm:gap-3">
                    <span className="text-white text-sm font-semibold">{edu.year}</span>
                    <span className="inline-block bg-[#2a2a2a] text-gray-200 text-xs px-3 py-1 rounded-full font-medium w-fit">
                      {edu.grade}
                    </span>
                  </div>
                </motion.div>
             ))
          )}
        </div>

      </div>
    </PageTransition>
  );
};

export default Education;